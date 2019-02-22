import React, { useState, useEffect } from 'react'
import Select from 'react-select/lib/Creatable'
import { sortBy } from 'lodash'

import { createCategory, createTransaction } from '../communication'

import type { Category, Transaction } from '../types'

import styles from './CreateTransaction.module.scss'

type Props = {
    categories: Category[],
    onCreatedCategory: (newCategory: Category) => void,
    onCreatedTransaction: (newTransaction: Transaction) => void,
}

export default function CreateTransaction({ categories, onCreatedCategory, onCreatedTransaction }: Props) {
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('0.00')
    const [category, setCategory] = useState(null)

    const [sortedCategories, setSortedCategories] = useState(null)
    const [creatingCategory, setCreatingCategory] = useState(false)

    const [error, setError] = useState(null)

    useEffect(() => {
        setSortedCategories(sortBy(categories, category => category.name.toLowerCase()))
    }, [categories])

    const handleTextChange = setter => e => {
        setError(null)
        setter(e.currentTarget.value)
    }

    const handleCategoryInputChange = () => {
        setError(null)
    }

    const handleCategoryChange = category => {
        setError(null)
        setCategory(category)
    }

    const handleCategoryCreate = async (categoryName) => {
        setError(null)
        setCreatingCategory(true)

        try {
            const newCategory = await createCategory(categoryName)

            onCreatedCategory(newCategory)

            setCategory(newCategory)
            setCreatingCategory(false)
        } catch (error) {
            setError(error)
            setCreatingCategory(false)
        }
    }

    const handleCreate = async () => {
        setError(null)

        try {
            const newTransaction = await createTransaction(amount, description, category ? category.id : null)

            onCreatedTransaction(newTransaction)

            setDescription('')
            setAmount('0.00')
            setCategory(null)
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className={styles.wrap}>
            {error && <p className="error">Uh oh! An error occurred when creating the transaction.</p>}

            <div className={styles.row}>
                <input
                    className={styles.description}
                    type="text"
                    placeholder="Description..."
                    value={description}
                    onChange={handleTextChange(setDescription)}
                />

                <input
                    className={styles.amount}
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="Amount..."
                    value={amount}
                    onChange={handleTextChange(setAmount)}
                />

                <Select
                    placeholder="Category..."
                    className={styles.categorySelect}
                    value={category}
                    isClearable
                    isLoading={creatingCategory}
                    onInputChange={handleCategoryInputChange}
                    onChange={handleCategoryChange}
                    onCreateOption={handleCategoryCreate}
                    options={sortedCategories || categories}
                    getOptionLabel={option => option.name || option.label}
                    getOptionValue={option => option.id}
                />

                <button onClick={handleCreate}>Create</button>
            </div>
        </div>
    )
}
