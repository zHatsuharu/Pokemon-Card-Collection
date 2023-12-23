export interface SetType {
    id: string
    name: string
    series: string
    printedTotal: number
    total: number
    legalities: Legalities
    ptcgoCode: string
    releaseDate: string
    updatedAt: string
    images: Images
    index?: number
}
  
export interface Legalities {
    unlimited: string
    standard: string
    expanded: string
}
  
export interface Images {
    symbol: string
    logo: string
}