import Link from 'next/link'
import React from 'react'


async function getPhotos() {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos")
    if (!res.ok)
        throw new Error("Data Fetch failed!")
    return res.json()
}
async function getComments() {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments")
    if (!res.ok)
        throw new Error("Data Fetch failed!")
    return res.json()
}

async function getPoke() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
    if (!res.ok)
        throw new Error("Data Fetch failed!")
    return res.json()
}

const ParalelDataFetch = async () => {
    const photos = getPhotos()
    const comments = getComments()
    const pokemons = getPoke()

    const [photo, comment, pokemon] = await Promise.all([photos, comments, pokemons])
    return (
        <div>
            <h1 className='flex font-bold justify-center items-center border m-5 p-4 text-4xl shadow-lg'>Paralel Data Fetching Example</h1>
            <div className='flex gap-5'>
                <div className='border shadow-red-800 m-4 p-2 rounded-lg'>
                    {photo.map(item =>
                        <Link key={item.id} href={`/imagedetail/${item.albumId}?id=${item.id}`}>
                            <div className='border p-3 shadow-md' >{item.title}</div>
                        </Link>
                    )}
                </div>
                <div className='border shadow-red-800 m-4 p-2 rounded-lg'>
                    {comment.map(item =>
                        <Link href={`/commentdetail/${item.id}`}>
                        <div className='border p-3 shadow-md' key={item.id}>{item.email}</div>
                        </Link>
                    )}
                </div>
                <div className='border shadow-red-800 m-4 p-2 rounded-lg'>
                    {pokemon.results.map(item => <div className='border p-3 shadow-md' key={item.name}>{item.name}</div>)}
                </div>
            </div>
        </div>
    )
}

export default ParalelDataFetch