import React, { useContext } from 'react'
import { formatISO9075 } from 'date-fns'
import { Link } from 'react-router-dom'

const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {

    return (
        <div className='flex w-full pb-20 mx-auto gap-5'>

            <div className='w-1/2 h-52 overflow-hidden'>
                <Link to={`/post/${_id}`}>
                    <img className='h-auto object-cover' src={'http://localhost:4000/' + cover} alt="" />
                </Link>
            </div>
            <div className="texts w-1/2">
                <Link to={`/post/${_id}`}>
                    <h2 className="text-2xl font-bold text-gray-600 ">{title}</h2>
                </Link>
                <p className="info flex gap-2 text-sm text-gray-400 py-2    ">
                    <a href="" className="author">@{author?.username}</a>
                    <time >{formatISO9075(new Date(createdAt))}</time>
                </p>
                <p className='summary text-md font-normal'>{summary}</p>

            </div>
        </div>
    )
}

export default Post