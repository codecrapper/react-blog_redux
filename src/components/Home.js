import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts, deletePost } from '../actions'

const Home = ({ getPosts, deletePost, allPosts }) => {
    const [currentLoad, setCurrentLoad] = useState(3)
    const [amountToLoad] = useState(3)
    const [nextLoad, setNextLoad] = useState(currentLoad + amountToLoad)
    
    const [loadAllPosts, setLoadAllPosts] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let request = await fetch('https://jsonplaceholder.typicode.com/posts')
        let data = await request.json()
        getPosts(data)
    }

    const deleteClick = (post) => {
        deletePost(post)
    }

    const loadClick = () => {
        let loadNextPosts = allPosts.filter(post => post.id > currentLoad && post.id <= nextLoad).map(post => {
            return (
                <div className="post card" key={post.id}>
                    <div className="card-content">
                        <Link to={`/${post.id}`}><span className="card-title">{post.title}</span></Link>
                        <p style={{fontStyle: "italic", textDecoration: 'underline'}}>blog {post.id}</p>
                        <p>{post.body}</p>
                        <button
                            onClick={() => deleteClick(post)} 
                            style={{marginTop: "10px"}} 
                            className="btn waves-effect waves-light red"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )
        })
        setLoadAllPosts([...loadAllPosts, ...loadNextPosts])
    
        setCurrentLoad(currentLoad + amountToLoad)
        setNextLoad(nextLoad + amountToLoad)
    }

    const renderList = () => {
        if(allPosts) {
            return allPosts.filter(post => post.id <= 3).map(post => {
                return (
                    <div className="post card" key={post.id}>
                        <div className="card-content">
                            <Link to={`/${post.id}`}><span className="card-title">{post.title}</span></Link>
                            <p style={{fontStyle: "italic", textDecoration: 'underline'}}>blog {post.id}</p>
                            <p>{post.body}</p>
                            <button
                                onClick={() => deleteClick(post)} 
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

    const renderLoadButton = () => {
        if(allPosts) {
            return <button onClick={loadClick} style={{display: 'block', margin: 'auto'}} className="btn waves-effect waves-light">
                Load more
            </button>
        }
        return null
    }

    return (
        <div className="container">
            <h4 className="center">Home</h4>
            {renderList()}

            {loadAllPosts}
            {renderLoadButton()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allPosts: state.posts
    }
}

export default connect(mapStateToProps, { getPosts, deletePost })(Home)