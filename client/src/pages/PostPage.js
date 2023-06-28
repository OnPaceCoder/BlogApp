import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'
import { UserContext } from '../context/UserContext'
const PostPage = () => {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => response.json()).then(data => setPostInfo(data))
    }, [])

    if (!postInfo) return '';


    return (
        <div className='post-page'>
            <h1 className='post-title'>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'>by @{postInfo.author.username}</div>

            {userInfo.id === postInfo.author._id && (
                <div className='edit-row'>
                    <a className='edit-btn' href="">Edit this post</a>
                </div>
            )}


            <div className='image'>
                <img src={`http://localhost:4000/${postInfo.cover}`} />
            </div>

            <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
        </div>
    )
}

export default PostPage