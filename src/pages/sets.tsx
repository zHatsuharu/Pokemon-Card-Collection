import { Accordion, AccordionItem, Image, Input, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SetType } from "../types/set";
import SetInfo from "../components/set-info";
import { CardType } from "../types/card";
import { SearchIcon } from "../icons/search-icons";
import Fuse, { FuseResult } from "fuse.js";

const baseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
export default function SetsPage() {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [sets, setSets] = useState<SetType[]>([]);
    const [search, setSearch] = useState("");
    const [fuse, setFuse] = useState<Fuse<unknown>>(new Fuse([]));
    const [isSearchAvailable, setIsSearchAvailable] = useState(true);

    const [isDataLoading, setIsDataLoading] = useState<boolean[]>([]);
    const [cards, setCards] = useState<CardType[][]>([[]]);
    
    useEffect(() => {
        (async () => {
            const url = baseUrl + 'sets';
            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    "X-Api-Key": apiKey
                }
            });
            if (result.status === 200) {
                const data = await result.json();
                setSets(data.data);
                setIsPageLoading(false);

                setIsDataLoading(new Array<boolean>(data.totalCount).fill(true));
                setCards(new Array<CardType[]>(data.totalCount).fill([]));
            }
        })();
    }, []);

    useEffect(() => {
        if (sets.length != 0) {
            sets.map((set, index) => set.index = index);
            setFuse(new Fuse(sets, {
                keys: [
                    "name",
                    "id"
                ]
            }));
        }
    }, [sets]);

    const getCards = async (set: SetType, index: number) => {
        if (cards[index].length <= 0) {
            setIsSearchAvailable(false);
            const url = baseUrl + `cards?q=set.id:${set.id}`;
            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    "X-Api-Key": apiKey
                }
            });
            if (result.status === 200) {
                const data = await result.json();
                const newCards = [...cards];
                newCards[index] = data.data;
                setCards(newCards);
                const newIsDataLoading = [...isDataLoading];
                newIsDataLoading[index] = false;
                setIsDataLoading(newIsDataLoading);
                setIsSearchAvailable(true);
            }
        }
    }

    function fuseSearch() : FuseResult<SetType>[] | SetType[] {
        if (search.length != 0) {
            return fuse.search(search) as FuseResult<SetType>[];
        } else {
            return sets;
        }
    }

    return (
        <div className="px-60">
        {isPageLoading ?
            <Spinner
                label="Loading..."
                color="warning"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
        :
            <div className="flex flex-col gap-4">
                <Input
                    label="Search"
                    isClearable
                    placeholder="Type to search..."
                    startContent={
                        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                    onValueChange={setSearch}
                    isDisabled={!isSearchAvailable}
                />
                <Accordion selectionMode="multiple" variant="splitted">
                    {fuseSearch().map((result, index) => {  
                        let set: SetType;
                        if ("item" in result) {
                            set = result.item;
                        } else {
                            set = result;
                        }
                        return (
                        <AccordionItem
                            key={index}
                            aria-label={set.name}
                            title={`${set.name} - ${set.id}`}
                            startContent={
                                <Image
                                isBlurred
                                src={set.images.symbol}
                                className="h-7"
                                />
                            }
                            onPress={() => getCards(set, set.index ? set.index : index)}
                        >
                            <SetInfo isLoading={isDataLoading[set.index ? set.index : index]} cards={cards[set.index ? set.index : index]} />
                        </AccordionItem>
                    )})}
                </Accordion>
            </div>
        }
        </div>
    )
}