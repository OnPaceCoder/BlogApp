import React from 'react'

const Post = ({ title, summary, content, cover, createdAt }) => {
    return (
        <div>
            <div className="post">
                <div className="image">

                    <img src="https://images.pexels.com/photos/16500373/pexels-photo-16500373/free-photo-of-wood-stairs-dirty-steps.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                </div>
                <div className="texts">
                    <h2>{title}</h2>
                    <p className="info">
                        <a href="" className="author">Priyank Vasoya</a>
                        <time>{createdAt}</time>
                    </p>
                    <p className='summary'>{summary}</p>
                </div>

            </div>
        </div>
    )
}

export default Post