import React, { useState, useEffect } from 'react'
import { keyBy } from 'lodash'

import Transaction from './Transaction'

import type { Category, Transaction as TransactionType } from '../types'

type Props = {
    transactions: TransactionType[],
    categories: Category[],
}

export default function TransactionList({ transactions, categories }: Props) {
    const [indexedCategories, setIndexedCategories] = useState({})

    useEffect(() => {
        setIndexedCategories(keyBy(categories, category => category.id))
    }, [categories])

    return (
        <div>
            {transactions.length === 0 && <i>No transactions yet...</i>}

            {transactions.map(transaction => {
                const category = indexedCategories.hasOwnProperty(transaction.id)
                    ? indexedCategories[transaction.id]
                    : null

                return <Transaction key={transaction.id} transaction={transaction} category={category} />
            })}
        </div>
    )
}
