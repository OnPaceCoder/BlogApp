import React from 'react'
import { formatISO9075 } from 'date-fns'
const Post = ({ title, summary, content, cover, createdAt, author }) => {
    return (
        <div>
            <div className="post">
                <div className="image">

                    <img src="https://images.pexels.com/photos/16500373/pexels-photo-16500373/free-photo-of-wood-stairs-dirty-steps.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                </div>
                <div className="texts">
                    <h2>{title}</h2>
                    <p className="info">
                        <a href="" className="author">{author?.username}</a>
                        <time>{formatISO9075(new Date(createdAt))}</time>
                    </p>
                    <p className='summary'>{summary}</p>
                </div>

            </div>
        </div>
    )
}

export default Post