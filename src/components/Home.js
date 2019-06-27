import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetch_posts_and_update_id, deletePost,  } from '../actions'

const Home = ({ fetch_posts_and_update_id, deletePost, allPosts   }) => {

    useEffect(() => {
        // USEEFFECT TRIGGERS ONCE 
        fetchData()
    }, [])

    const fetchData = () => {
        allPosts.allPosts.length ? console.log('do not fetch again') : fetch_posts_and_update_id()
    }

    // RENDER LIST OF POSTS ON SCREEN
    const renderFetchPostsList = () => {
        if(allPosts.allPosts.length) {
            return allPosts.allPosts.map(post => {
                return (
                    <div className="post card" key={post.id}>
                        <div className="card-content">
                            <Link to={`/${post.id}`}><span className="card-title">{post.title}</span></Link>
                            <p style={{fontStyle: "italic", textDecoration: 'underline'}}>blog {post.id}</p>
                            <p>{post.body}</p>
                            <button
                                onClick={() => deleteClick(post.id)} 
                                style={{marginTop: "10px"}} 
                                className="btn waves-effect waves-light red"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })
        }
        return <div className="center">Loading...</div>
    }


    // DELETE POST FUNCTION 
    const deleteClick = (id) => {
        deletePost(id)
    }

    // LOAD MORE BUTTON 
    const renderLoadButton = () => {
        if(allPosts.allPosts.length) {
            return <button onClick={loadMorePostsClick} style={{display: 'block', margin: 'auto'}} className="btn waves-effect waves-light">
                Load more
            </button>
        }
        return null
    }

    // LOAD NEXT 3 POSTS ONTO SCREEN
    const loadMorePostsClick = () => {
        fetch_posts_and_update_id()
    }

    return (
        <div className="container">
            <h4 className="center">Home</h4>
            {renderFetchPostsList()}
            {renderLoadButton()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allPosts: state.posts
    }
}

export default connect(mapStateToProps, {  fetch_posts_and_update_id, deletePost  })(Home)