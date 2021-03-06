import React, { useState, useEffect } from 'react'
import { keyBy } from 'lodash'

import Transaction from './Transaction'

import type { Category, Transaction as TransactionType } from '../types'

import styles from './TransactionList.module.scss'

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
            <div className={styles.transactionSort}>
                <div className={styles.date}>Date</div>
                <div className={styles.description}>Description</div>
                <div className={styles.amount}>Amount</div>
            </div>

            {transactions.length === 0 && <p className="center"><i>No transactions yet...</i></p>}

            {transactions.map(transaction => {
                const category = indexedCategories.hasOwnProperty(transaction.category_id)
                    ? indexedCategories[transaction.category_id]
                    : null

                return <Transaction key={transaction.id} transaction={transaction} category={category} />
            })}
        </div>
    )
}
