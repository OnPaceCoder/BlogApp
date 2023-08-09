import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

export const IndexPage = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch("http://localhost:4000/post").then(response => {
            response.json().then(posts => {
                setPosts(posts)

            })
        })

    }, [])



    return (
        <div className='px-5 '>
            {
                posts?.length > 0 && posts?.map(post =>
                    <Post  {...post} key={post._id} />)
            }

        </div>
    )
}
