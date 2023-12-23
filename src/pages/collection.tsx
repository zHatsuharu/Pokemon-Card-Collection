import { FirebaseError } from "firebase/app";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { db } from "../../firebase";
import { AuthContext } from "../providers/auth-providers";
import { Button, Card, CardBody, CardFooter, CheckboxGroup, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Tooltip, useDisclosure } from "@nextui-org/react";
import PlusIcon from "../icons/plus-icon";
import { CardType } from "../types/card";
import { SearchIcon } from "../icons/search-icons";
import { CardCheckbox } from "../components/card-checkbox";
import { DeleteIcon } from "../icons/delete-icon";

const baseUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY;
export default function CollectionPage() {
    const {state: { userInfos }} = useContext(AuthContext);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [isLoading, setIsLoading] = useState(true);
    const [currentDbInventory, setCurrentDbInventory] = useState<string[]>([]);
    const [dbDocId, setDbDocId] = useState('');
    const [inventory, setInventory] = useState<CardType[]>([]);
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<CardType[]>([]);
    const [newCards, setNewCards] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [haveSearched, setHaveSearched] = useState(false);

    const [isNew, setIsNew] = useState(false);

    // Lucene syntax => https://lucene.apache.org/core/2_9_4/queryparsersyntax.html
    //
    //  GET A CARD :
    //  https://api.pokemontcg.io/v2/cards?q=id:dp3-1
    //      --> 'q' make the query, we are asking to get the card with the id 'dp3-1'
    //
    //  WE NEED MORE CARDS !
    //  GET MULTIPLE CARDS :
    //  https://api.pokemontcg.io/v2/cards?q=id:dp3-1%20OR%20id:ex12-1
    //      --> Now we hare %20OR%20 that make an OR !
    //
    //  The inventory should have a join with this value : "%20OR%20" and every value must be "id:<cardId>"
    //

    const getDbInventory = async () => {
        try {
            const collectionInventory = collection(db, 'inventory');
            const datas = await getDocs(collectionInventory);
            const docs = datas.docs;
            const inventoryData = docs.map(doc => ({...doc.data()})).find(el => el['id'] == userInfos.uid);
            if (inventoryData) {
                const indexDocs = docs.map(doc => ({...doc.data()})).findIndex(el => el['id'] == userInfos.uid);
                setDbDocId(docs[indexDocs].id);
                setCurrentDbInventory(inventoryData['inventory']);
                const queryInventory: string[] = inventoryData.inventory.map((id: string) => `id:${id}`);
                const url = baseUrl + `cards?q=${queryInventory.join('%20OR%20')}`;
                const result = await fetch(url, {
                    method: 'GET',
                    headers: {
                        "X-Api-Key": apiKey
                    }
                });
                const data = await result.json();
                setInventory(data.data);
            } else {
                setIsNew(true);
            }
        } catch(e) {
            if (e instanceof FirebaseError) {
                console.error(e);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getDbInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchCards = async () => {
        setIsSearching(true);
        setSearchResult([]);
        const url = baseUrl + `cards?q=name:*${search}*%20OR%20id:*${search}*`;
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                "X-Api-Key": apiKey
            }
        });
        const data = await result.json();
        const results: CardType[] = data.data;
        setSearchResult(results.filter(card => !currentDbInventory.includes(card.id)));
        setIsSearching(false);
        setHaveSearched(true);
    };
    
    const saveToDb = async (callback: () => void, cardToRemove?: string) => {
        setIsSaving(true);
        let newInventory = [...currentDbInventory, ...newCards];
        try {
            if (isNew) {
                await addDoc(collection(db, 'inventory'), {
                    id: userInfos.uid,
                    inventory: newInventory
                });
            } else {
                if (cardToRemove) {
                    newInventory = newInventory.filter(card => card != cardToRemove);
                }
                const docRef = doc(db, 'inventory', dbDocId);
                await updateDoc(docRef, {
                    inventory: newInventory
                })
            }
        } catch(e) {
            console.error(e)
        } finally {
            setCurrentDbInventory(newInventory);
            setNewCards([]);
            setSearch('');
            setSearchResult([]);
            setIsSaving(false);
            setHaveSearched(false);
            callback();
            getDbInventory();
        }
    };

    return(
        <div className="flex flex-col px-60 pt-20">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-extrabold m-10">Your collection !</h1>
                <Button
                    color="primary"
                    variant="flat"
                    startContent={<PlusIcon />}
                    isDisabled={isLoading}
                    onPress={onOpen}
                >
                    Add card
                </Button>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                size="4xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-1">
                                <h1 className="text-2xl font-extrabold">Add your card !</h1>
                            </ModalHeader>
                            <ModalBody>
                                <div
                                    className="flex flex-row items-center gap-4"
                                >
                                    <Input
                                        label="Search"
                                        startContent={<SearchIcon />}
                                        placeholder="Search your card by id or name..."
                                        onValueChange={setSearch}
                                        isDisabled={isSearching}
                                    />
                                    <Button
                                        onPress={searchCards}
                                        isLoading={isSearching}
                                        isDisabled={search.length <= 0}
                                    >
                                        Search
                                    </Button>
                                </div>
                                <div
                                    className="grid overflow-auto max-h-[70vh]"
                                >
                                    {isSearching ?
                                        <Spinner
                                            label="Loading..."
                                            color="warning"
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        />
                                    :
                                        <CheckboxGroup
                                            orientation="horizontal"
                                            value={newCards}
                                            onValueChange={setNewCards}
                                        >
                                            {searchResult.length > 0 ?
                                                searchResult.map(card => (
                                                    <CardCheckbox key={card.id} value={card.id} card={card} />
                                                ))
                                            :
                                                <div className="w-full text-center text-gray-700 m-10">
                                                    {haveSearched ?
                                                        <span>No available card found.</span>
                                                    :
                                                        <span>Search for a card first !</span>
                                                    }
                                                </div>
                                            }
                                        </CheckboxGroup>
                                    }
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex justify-between items-center">
                                <div>
                                    <span className="flex gap-2">
                                        <span className="font-bold">Card{newCards.length > 1 && 's'} to add :</span>
                                        <span className="text-gray-600">
                                        {newCards.length > 0 ?
                                            newCards.join(', ')
                                            :
                                            'Select a card to add !'
                                        }
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <Button
                                        isLoading={isSaving}
                                        isDisabled={newCards.length <= 0}
                                        onPress={() => saveToDb(onClose)}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                        isDisabled={isSaving}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {isLoading ?
                <Spinner
                    label="Loading..."
                    color="warning"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            :
                <>
                    {inventory.length <= 0 ?
                        <div className="text-center w-full">
                            <span className="font-bold text-gray-800">Your inventory is empty... Add your first card !</span>
                        </div>
                    :
                    <div className="grid grid-cols-5 gap-4">
                        {inventory.map(card => (
                            <Card
                                shadow="sm"
                                key={card.id}
                            >
                                <CardBody className="p-0 overflow-visible">
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        className="w-full object-cover"
                                        src={card.images.small}
                                    />
                                </CardBody>
                                <CardFooter className="text-small justify-between">
                                    <span>{card.id}</span>
                                    <Tooltip color="danger" content="Delete card">
                                        <Button
                                            className="text-lg text-danger cursor-pointer active:opacity-50"
                                            isIconOnly
                                            variant="light"
                                            onPress={() => saveToDb(() => {}, card.id)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </Tooltip>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    }
                </>
            }
        </div>
        
    )
}