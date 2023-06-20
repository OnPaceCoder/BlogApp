import React from 'react'

const Post = () => {
    return (
        <div>
            <div className="post">
                <div className="image">

                    <img src="https://images.pexels.com/photos/16500373/pexels-photo-16500373/free-photo-of-wood-stairs-dirty-steps.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                </div>
                <div className="texts">
                    <h2>Full-house battery backup coming later this year</h2>
                    <p className="info">
                        <a href="" className="author">Priyank Vasoya</a>
                        <time>2023-06-20</time>
                    </p>
                    <p className='summary'>Today at its special launch event , home backup power giant lawn mover</p>
                </div>

            </div>
        </div>
    )
}

export default Post