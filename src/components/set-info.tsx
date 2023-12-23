import { Image, Spinner } from "@nextui-org/react";
import { CardType } from "../types/card";

type props = {
    isLoading: boolean
    cards: CardType[]
}

export default function SetInfo({ isLoading, cards }: props) {
    return (
        <>
            {isLoading ?
                <div className="flex justify-center">
                    <Spinner />
                </div>
            :
                <div className="flex flex-col items-center justify-center">
                    <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                        {cards.map((card, index) => (
                            <Image
                                key={index}
                                src={card.images.small}
                            />
                        ))}
                    </div>
                </div>
            }
        </>
    )
}