import { Button, Chip, Image, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { CardType } from "../types/card";

type props = {
    isOpen: boolean
    onOpenChange: () => void
    card: CardType | undefined
}

export const ModalHome = ({
    isOpen,
    onOpenChange,
    card
}: props) => {
    if (!card) return(<></>);
    console.log(card);
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
            backdrop="blur"
            size="3xl"
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{card.name} - {card.id}</ModalHeader>
                <ModalBody>
                    <div className="mx-auto">
                        <Image
                            width={400}
                            src={card.images.large}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Table
                            aria-label="pokemon card info"
                            removeWrapper
                        >
                            <TableHeader>
                                <TableColumn>NAME</TableColumn>
                                <TableColumn>RARITY</TableColumn>
                                <TableColumn>TYPE</TableColumn>
                                <TableColumn>EVOLVES FROM</TableColumn>
                                <TableColumn>EVOLVES TO</TableColumn>
                                <TableColumn>SET</TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow key={1}>
                                    <TableCell>{card.name}</TableCell>
                                    <TableCell>{card.rarity}</TableCell>
                                    <TableCell>{card.types.join(', ')}</TableCell>
                                    <TableCell>{card.evolvesFrom && card.evolvesFrom}</TableCell>
                                    <TableCell>{card.evolvesTo && card.evolvesTo.join(', ')}</TableCell>
                                    <TableCell>{card.set.name}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <h1 className="font-bold">Normal card</h1>
                        <div>
                            {card.tcgplayer && card.tcgplayer.prices.normal &&
                                <Table
                                    aria-label="pokemon tcgplayer normal"
                                    removeWrapper
                                >
                                    <TableHeader>
                                        <TableColumn>NAME</TableColumn>
                                        <TableColumn>UPDATE</TableColumn>
                                        <TableColumn>MARKET PRICE</TableColumn>
                                        <TableColumn>LOWEST</TableColumn>
                                        <TableColumn>HIGHEST</TableColumn>
                                        <TableColumn>BUY</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key={1}>
                                            <TableCell>TCGPlayer</TableCell>
                                            <TableCell>{card.tcgplayer.updatedAt}</TableCell>
                                            <TableCell>
                                                <Chip
                                                variant="light"
                                                startContent={<span>$</span>}
                                                >
                                                    {card.tcgplayer.prices.normal.market}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant="light"
                                                    startContent={<span>$</span>}
                                                >
                                                    {card.tcgplayer.prices.normal.low}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant="light"
                                                    startContent={<span>$</span>}
                                                >
                                                    {card.tcgplayer.prices.normal.high}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    isExternal
                                                    href={card.tcgplayer.url}
                                                    showAnchorIcon
                                                    color="success"
                                                >
                                                    Buy
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            }
                            <Table
                                aria-label="pokemon cardmarket normal"
                                removeWrapper
                            >
                                <TableHeader>
                                    <TableColumn>NAME</TableColumn>
                                    <TableColumn>UPDATE</TableColumn>
                                    <TableColumn>AVERAGE PRICE</TableColumn>
                                    <TableColumn>LOWEST</TableColumn>
                                    <TableColumn>TREND</TableColumn>
                                    <TableColumn>BUY</TableColumn>
                                </TableHeader>
                                <TableBody>
                                <TableRow key={1}>
                                    <TableCell>CardMarket</TableCell>
                                    <TableCell>{card.cardmarket && card.cardmarket.updatedAt}</TableCell>
                                    <TableCell>
                                        <Chip
                                            variant="light"
                                            endContent={<span>€</span>}
                                        >
                                            {card.cardmarket && card.cardmarket.prices.averageSellPrice}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            variant="light"
                                            endContent={<span>€</span>}
                                        >
                                            {card.cardmarket && card.cardmarket.prices.lowPrice}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            variant="light"
                                            endContent={<span>€</span>}
                                        >
                                            {card.cardmarket && card.cardmarket.prices.trendPrice}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        {card.cardmarket && 
                                            <Link
                                                isExternal
                                                href={card.cardmarket.url}
                                                showAnchorIcon
                                                color="success"
                                            >
                                                Buy
                                            </Link>
                                        }
                                    </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <>{card.tcgplayer && card.tcgplayer.prices.holofoil &&
                        <>
                        <h1 className="font-bold">Holofoil</h1>
                        <div>
                                <Table
                                    aria-label="pokemon tcgplayer holofoil"
                                    removeWrapper
                                >
                                    <TableHeader>
                                        <TableColumn>NAME</TableColumn>
                                        <TableColumn>UPDATE</TableColumn>
                                        <TableColumn>MARKET PRICE</TableColumn>
                                        <TableColumn>LOWEST</TableColumn>
                                        <TableColumn>HIGHEST</TableColumn>
                                        <TableColumn>BUY</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key={1}>
                                            <TableCell>TCGPlayer</TableCell>
                                            <TableCell>{card.tcgplayer.updatedAt}</TableCell>
                                            <TableCell>
                                                <Chip
                                                variant="light"
                                                startContent={<span>$</span>}
                                                >
                                                    {card.tcgplayer.prices.holofoil.market}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant="light"
                                                    startContent={<span>$</span>}
                                                >
                                                    {card.tcgplayer.prices.holofoil.low}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant="light"
                                                    startContent={<span>$</span>}
                                                >
                                                    {card.tcgplayer.prices.holofoil.high}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    isExternal
                                                    href={card.tcgplayer.url}
                                                    showAnchorIcon
                                                    color="success"
                                                >
                                                    Buy
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                        </div>
                        </>
                        }</>
                        <h1 className="font-bold">Reverse Holofoil</h1>
                        <div>
                        {card.tcgplayer && card.tcgplayer.prices.reverseHolofoil &&
                                <Table
                                    aria-label="pokemon tcgplayer reverseHolofoil"
                                    removeWrapper
                                >
                                    <TableHeader>
                                        <TableColumn>NAME</TableColumn>
                                        <TableColumn>UPDATE</TableColumn>
                                        <TableColumn>MARKET PRICE</TableColumn>
                                        <TableColumn>LOWEST</TableColumn>
                                        <TableColumn>HIGHEST</TableColumn>
                                        <TableColumn>BUY</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key={1}>
                                            <TableCell>TCGPlayer</TableCell>
                                            <TableCell>{card.tcgplayer.updatedAt}</TableCell>
                                            <TableCell>
                                                <Chip
                                                variant="light"
                                                startContent={<span>$</span>}
                                                >
                                                    {card.tcgplayer.prices.reverseHolofoil.market}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant="light"
                                                    startContent={<span>$</span>}
                                                >
                                                    {card.tcgplayer.prices.reverseHolofoil.low}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    variant="light"
                                                    startContent={<span>$</span>}
                                                >
                                                    {card.tcgplayer.prices.reverseHolofoil.high}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    isExternal
                                                    href={card.tcgplayer.url}
                                                    showAnchorIcon
                                                    color="success"
                                                >
                                                    Buy
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            }
                            <Table
                                aria-label="pokemon cardmarket reverseHolofoil"
                                removeWrapper
                            >
                                <TableHeader>
                                    <TableColumn>NAME</TableColumn>
                                    <TableColumn>UPDATE</TableColumn>
                                    <TableColumn>AVERAGE PRICE</TableColumn>
                                    <TableColumn>LOWEST</TableColumn>
                                    <TableColumn>TREND</TableColumn>
                                    <TableColumn>BUY</TableColumn>
                                </TableHeader>
                                <TableBody>
                                <TableRow key={1}>
                                    <TableCell>CardMarket</TableCell>
                                    <TableCell>{card.cardmarket && card.cardmarket.updatedAt}</TableCell>
                                    <TableCell>
                                        <Chip
                                            variant="light"
                                            endContent={<span>€</span>}
                                        >
                                            {card.cardmarket && card.cardmarket.prices.reverseHoloSell}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            variant="light"
                                            endContent={<span>€</span>}
                                        >
                                            {card.cardmarket && card.cardmarket.prices.reverseHoloLow}
                                        </Chip>                                    
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            variant="light"
                                            endContent={<span>€</span>}
                                        >
                                            {card.cardmarket && card.cardmarket.prices.reverseHoloTrend}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        {card.cardmarket && 
                                            <Link
                                                isExternal
                                                href={card.cardmarket.url}
                                                showAnchorIcon
                                                color="success"
                                            >
                                                Buy
                                            </Link>
                                        }
                                    </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}