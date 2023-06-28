import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'
const PostPage = () => {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => response.json()).then(data => setPostInfo(data))
    }, [])

    if (!postInfo) return '';


    return (
        <div className='post-page'>
            <h1 className='post-title'>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'>by @{postInfo.author.username}</div>
            <div className='image'>
                <img src={`http://localhost:4000/${postInfo.cover}`} />
            </div>

            <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
        </div>
    )
}

export default PostPage