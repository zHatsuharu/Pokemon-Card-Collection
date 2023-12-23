import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react"
import { CardType } from "../types/card"
import { CheckIcon, CrossIcon } from "./chip-icon"

type props = {
    card: CardType
    isSwitching: boolean
    onPressStart: () => void
    onPress: () => void
}

export const CardHome = ({card, isSwitching, onPressStart, onPress}: props) => (
    <Card
        shadow="sm"
        isPressable={!isSwitching}
        className="w-fit max-w-[245px]"
        onPressStart={onPressStart}
        onPress={onPress}
    >
        <CardBody className="overflow-visible p-0">
            <div className="flex justify-center">
                <Image
                    isBlurred
                    shadow="sm"
                    radius="lg"
                    alt={card.name}
                    className="w-full object-cover"
                    src={card.images.small}
                    width={245}
                    height={342}
                />
            </div>
        </CardBody>
        <CardFooter className="text-small justify-between">
            <b>{card.name}</b>
            <div className="flex flex-col gap-2">
                <Chip
                    startContent={card.tcgplayer ? <CheckIcon size={18} /> : <CrossIcon size={18} />}
                    variant="flat"
                    color={card.tcgplayer ? "success" : "danger"}
                >
                    TCGplayer
                </Chip>
                <Chip
                    startContent={card.cardmarket ? <CheckIcon size={18} /> : <CrossIcon size={18} />}
                    variant="flat"
                    color={card.cardmarket ? "success" : "danger"}
                >
                    Cardmarket
                </Chip>
            </div>
        </CardFooter>
    </Card>
)