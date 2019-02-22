export type Category = {
    id: number,
    name: string,
}

export type Transaction = {
    id: number,
    amount: number,
    date: string,
    description: string,
    category_id: number,
}
