"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const CommentDetail = () => {
    const params = useParams()
    console.log(params.id)
    return (
        <div>page</div>
    )
}

export default CommentDetail