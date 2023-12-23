import { CardType } from "./card";

export interface Page {
    data: CardType[]
    page: number
    pageSize: number
    count: number
    totalCount: number
}