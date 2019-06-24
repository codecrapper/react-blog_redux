import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const Post = props => {
    // const [post, setPost] = useState(null)

    // useEffect(() => {
    //     let id = props.match.params.post_id
    //     setPost(props.allPosts[id - 1])
    // }, [])

    // const makePost = () => {
    //     if(post) {
    //         return (
    //             <div className="post">
    //                 <h4 className="center">{post.title}</h4>
    //                 <p>{post.body}</p>
    //             </div>
    //         )
    //     }
    //     return null
    // }
    
    return (
        <div className="container">
            {/* {makePost()} */}
            <div className="post">
                <h4 className="center">{props.post.title}</h4>
                <p>{props.post.body}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.post_id
    return {
        post: state.posts.find(post => {
            return post.id.toString() === id
        })
    }
}

export default connect(mapStateToProps)(Post)