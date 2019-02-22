import React from 'react'

import type { Category, Transaction as TransactionType } from '../types'

import styles from './Transaction.module.scss'

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

type Props = {
    transaction: TransactionType,
    category: ?Category,
}

export default function Transaction({ transaction, category }: Props) {
    const { date: dateString, description, amount } = transaction

    const date = new Date(dateString)
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()

    return (
        <div className={styles.transaction}>
            <div className={styles.dateWrap}>
                <div className={styles.date}>{months[month]} {day}</div>
                <div className={styles.year}>{year}</div>
            </div>

            <div className={styles.descriptionWrap}>
                <div className={styles.description}>{description}</div>
                <div className={styles.category}>{category ? category.name : <i>No category</i>}</div>
            </div>

            <div className={styles.amount}>{formatCurrency(amount)}</div>
        </div>
    )
}

function formatCurrency(amount: string) {
    return `$${parseFloat(amount).toFixed(2)}`
}
