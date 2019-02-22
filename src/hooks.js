import { useState, useEffect } from 'react'

export function useFetch(fetchFunction: () => Promise<*>) {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const load = async () => {
        setLoading(true)

        try {
            const data = await fetchFunction()

            setData(data)
        } catch (error) {
            setError(error)
        }

        setLoading(false)
    }

    const updateData = (data: any) => {
        setData(data)
    }

    useEffect(() => {
        load()
    }, [])

    return [ error, loading, data, updateData ]
}
