import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const Post = props => {
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
        // post: state.posts.find(post => {
        //     return post.id.toString() === id
        // })
        post: state.posts[id-1]
    }
}

export default connect(mapStateToProps)(Post)