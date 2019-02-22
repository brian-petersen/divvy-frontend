import axios from 'axios'

import type { Category, Transaction } from './types'

export async function getCategories(): Promise<Category> {
    const response = await axios.get('/api/categories')

    return response.data.data
}

export async function createCategory(name: string): Promise<Category> {
    const response = await axios.post('/api/categories', { category: { name } })

    return response.data.data
}

export async function getTransactions(): Promise<Transaction> {
    const response = await axios.get('/api/transactions')

    return response.data.data
}

export async function createTransaction(
    amount: number | string,
    description: string,
    categoryId: ?number
): Promise<Transaction> {
    const response = await axios.post('/api/transactions', {
        transaction: {
            amount,
            description,
            date: new Date().toISOString(),
            category_id: categoryId,
        }
    })

    return response.data.data
}
