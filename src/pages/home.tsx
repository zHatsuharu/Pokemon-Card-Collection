import { useEffect, useState } from "react";
import { CardType } from "../types/card";
import { Pagination, Spinner, useDisclosure } from "@nextui-org/react";
import { Page } from "../types/page";
import { CardSkeleton } from "../components/card-skeleton";
import { CardHome } from "../components/card-home";
import { ModalHome } from "../components/modal-home";

const baseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
export default function HomePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);
    const [cards, setCards] = useState<CardType[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const url = baseUrl + `/cards?page=${page}&pageSize=50`;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [currentCard, setCurrentCard] = useState<CardType>();

    const getPage = async () => {
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                "X-Api-Key": apiKey
            }
        });
        if (result.status === 200) {
            const pageInfo: Page = await result.json();
            setCards(pageInfo.data);
            setTotal(Math.ceil(pageInfo.totalCount/pageInfo.pageSize));
        }
    }

    useEffect(() => {
        (async () => {
            setIsSwitching(true);
            await getPage();
            setIsSwitching(false);
            setIsLoaded(true);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return(
        <div className="flex flex-col items-center justify-center">
            <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {!isLoaded || isSwitching ?
                <>
                    {[...Array(10).keys()].map(key => (
                        <CardSkeleton key={key} />
                    ))}
                    <Spinner
                        label="Loading..."
                        color="warning"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                </>
            :
                <>
                    {cards.map((card, index) => (
                        <CardHome key={index} card={card} isSwitching={isSwitching} onPressStart={() => setCurrentCard(card)} onPress={onOpen} />
                    ))}
                </>
            }
            </div>
            {isLoaded &&
                <Pagination
                    className="my-16 mx-auto"
                    initialPage={1}
                    total={total}
                    variant="light"
                    onChange={setPage}
                    siblings={2}
                    isDisabled={isSwitching}
                />
            }
            <ModalHome isOpen={isOpen} onOpenChange={onOpenChange} card={currentCard} />
        </div>
    )
}