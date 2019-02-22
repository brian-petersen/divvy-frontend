import React from 'react'

import CreateTransaction from './components/CreateTransaction'
import TransactionList from './components/TransactionList'
import { useFetch } from './hooks'
import { getCategories, getTransactions } from './communication'

export default function App() {
    const [categoriesError, categoriesLoading, categories, updateCategories] = useFetch(getCategories)
    const [transactionsError, transactionsLoading, transactions, updateTransactions] = useFetch(getTransactions)

    const error = categoriesError || transactionsError
    const loading = categoriesLoading || transactionsLoading

    const handleCreatedCategory = (newCategory) => {
        if (!categories) {
            return console.error('Categories should not be null')
        }

        updateCategories([...categories, newCategory])
    }

    const handleCreatedTransaction = (newTransaction) => {
        if (!transactions) {
            return console.error('Categories should not be null')
        }

        updateTransactions([...transactions, newTransaction])
    }

    return (
        <div>
            {error && <p>Oops</p>}
            {!error && loading && <p>Loading</p>}

            {!error && !loading && transactions && categories && (
                <>
                    <CreateTransaction
                        categories={categories}
                        onCreatedCategory={handleCreatedCategory}
                        onCreatedTransaction={handleCreatedTransaction}
                    />
                    <TransactionList transactions={transactions} categories={categories} />
                </>
            )}
        </div>
    )
}
