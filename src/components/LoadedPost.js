import React from 'react'
import { connect } from 'react-redux'

const Post = props => {
    return (
        <div className="container">
            <div className="post">
                <h4 className="center">{props.post.title}</h4>
                <h5 style={{fontStyle: "italic", textDecoration: 'underline'}}>blog {props.post.id}</h5>
                <p>{props.post.body}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.post_id
    return {
        post: state.posts.loadMorePosts.find(post => {
            return post.id.toString() === id
        })
    }
}

export default connect(mapStateToProps)(Post)