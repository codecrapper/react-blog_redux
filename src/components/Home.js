import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts, deletePost, fetchLoadedPosts, nextPostsToLoad, deleteLoadedPost } from '../actions'

const Home = ({ getPosts, deletePost, allPosts, fetchLoadedPosts, nextPostsToLoad, deleteLoadedPost }) => {
    const [currentLoadedPosts, setCurrentLoadedPosts] = useState([1,2,3])
    
    useEffect(() => {
        allPosts.allPosts.length ? console.log('do not fetch again') : fetchData()
    }, [])

    // FETCH FIRST 3 POSTS 
    const fetchData = async () => {
        let data = await Promise.all([
                        fetch(`https://jsonplaceholder.typicode.com/posts/${currentLoadedPosts[0]}`).then(res => res.json()),
                        fetch(`https://jsonplaceholder.typicode.com/posts/${currentLoadedPosts[1]}`).then(res => res.json()),
                        fetch(`https://jsonplaceholder.typicode.com/posts/${currentLoadedPosts[2]}`).then(res => res.json())
                        ])
        await getPosts(data)
    }

    // RENDERS FIRST 3 POSTS 
    const renderList = () => {
        if(allPosts.allPosts) {
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

    // DELETE FUNCTION FOR FIRST 3 POSTS 
    const deleteClick = (id) => {
        deletePost(id)
    }

    // LOAD MORE BUTTON 
    const renderLoadButton = () => {
        if(allPosts) {
            return <button onClick={loadMorePostsClick} style={{display: 'block', margin: 'auto'}} className="btn waves-effect waves-light">
                Load more
            </button>
        }
        return null
    }

    // FETCHES NEXT 3 POSTS 
    const loadMorePostsClick = async () => {
        let data = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${allPosts.postsToLoad[0]}`).then(res => res.json()),
            fetch(`https://jsonplaceholder.typicode.com/posts/${allPosts.postsToLoad[1]}`).then(res => res.json()),
            fetch(`https://jsonplaceholder.typicode.com/posts/${allPosts.postsToLoad[2]}`).then(res => res.json())
            ])
            await fetchLoadedPosts(data)

            let nextNumbers = allPosts.postsToLoad.map(numb => numb + 3)
            nextPostsToLoad(nextNumbers)
    }

    // RENDERS 3 MORE POSTS FROM LOAD MORE BUTTON
    const renderFetchLoadedList = () => {
        if(allPosts.loadMorePosts) {
            return allPosts.loadMorePosts.map(post => {
                return (
                    <div className="post card" key={post.id}>
                        <div className="card-content">
                            <Link to={`/loaded/${post.id}`}><span className="card-title">{post.title}</span></Link>
                            <p style={{fontStyle: "italic", textDecoration: 'underline'}}>blog {post.id}</p>
                            <p>{post.body}</p>
                            <button
                                onClick={() => deleteLoadMorePost(post.id)} 
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
        return null
    }

    // DELETE LOADED POST
    const deleteLoadMorePost = (id) => {
        deleteLoadedPost(id)
    }

    return (
        <div className="container">
            <h4 className="center">Home</h4>
            {renderList()}
            {renderFetchLoadedList()}
            {renderLoadButton()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allPosts: state.posts
    }
}

export default connect(mapStateToProps, { 
                getPosts, deletePost, fetchLoadedPosts, nextPostsToLoad, deleteLoadedPost 
            })(Home)