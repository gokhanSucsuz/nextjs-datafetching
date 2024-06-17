import Image from "next/image";
import Link from "next/link";
import CommentId from "./commentdetail/[id]/page";
import { cache } from "react";

async function getPhotos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos",
    {
      cache: "force-cache"
    }
  )
  if (!res.ok)
    throw new Error("Data Fetch failed!")
  return res.json()
}
async function getComments() {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments",
    {
      cache: "force-cache"
    }
  )
  if (!res.ok)
    throw new Error("Data Fetch failed!")
  return res.json()
}
export async function getComment(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?id=${id}`)
  if (!res.ok)
    throw new Error("Data Fetch failed!")
  return res.json()
}


export default async function Home() {
  const photos = await getPhotos()
  const comments = await getComments()

  return (
    <main className="flex">
      <div className="w-1/2">
        <h1 className="font-bold">Comments from jsonplaceholder</h1>
        {
          comments.map(item =>
            <div key={item.id} className="p-4 border m-3 hover:text-blue-500 shadow-lg rounded-lg">
              <Link href={`/commentdetail/${item.id}`}>
                {item.name}
              </Link>
            </div>
          )
        }
      </div>
      <div className="flex flex-wrap items-center bg-slate-600 gap-2 p-5 w-1/2">
        <h1 className="w-screen">Images from jsonplaceholder</h1>
        {
          photos.map(item =>
            <div key={item.id} >
              <Link href={`/imagedetail/${item.albumId}?id=${item.id}`}>
                <Image
                  className="rounded-lg"
                  src={item.thumbnailUrl}
                  alt={item.title}
                  width={150}
                  height={150}
                />
              </Link>
            </div>
          )
        }
      </div>
    </main>
  );
}
