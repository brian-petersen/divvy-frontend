export type Category = {
    id: number,
    name: string,
}

export type Transaction = {
    id: number,
    amount: string,
    date: string,
    description: string,
    category_id: number,
}
