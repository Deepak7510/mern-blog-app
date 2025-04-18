import { useEffect, useState } from "react"

function useFetch(url, option = {}, dependencies = []) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    async function getData() {
        setLoading(true);
        try {
            const response = await fetch(url, option);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const result = await response.json();
            setData(result.data);
            setError(null);
        } catch (error) {
            setError(error.message); 
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, dependencies)

    return { getData, loading, data, error }
}


export default useFetch