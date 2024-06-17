"use client"
import React, { useEffect, useState } from 'react';

async function getPoke() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000", {
        next: {
            revalidate: 3
        },
        cache: 'force-cache'
    }
    )
    if (!res.ok)
        throw new Error("Data Fetch failed!")
    return res.json()
}

const PokemonApi = () => {
    const [pokes, setPokes] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPoke();
                setPokes(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    if (!pokes) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            {pokes.results.map((item, index) => (
                <div key={index} className="border p-2 m-2">
                    <p>{item.name}</p>

                </div>
            ))}
        </div>
    );
}

export default PokemonApi;
