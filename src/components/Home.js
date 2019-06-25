import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts, deletePost, fetchLoadedPosts } from '../actions'

const Home = ({ getPosts, deletePost, allPosts, fetchLoadedPosts }) => {
    const [currentLoadedPosts, setCurrentLoadedPosts] = useState([1,2,3])
    const [loadMorePosts, setLoadMorePosts] = useState([4,5,6])

    const [loadedPosts, setLoadedPosts] = useState([])
    
    useEffect(() => {
        fetchData()
    }, [])

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
                            {/* <Link to={`/${post.id}`}><span className="card-title">{post.title}</span></Link> */}
                            <span className="card-title">{post.title}</span>
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

    const renderLoadButton = () => {
        if(allPosts) {
            return <button onClick={loadMorePostsClick} style={{display: 'block', margin: 'auto'}} className="btn waves-effect waves-light">
                Load more
            </button>
        }
        return null
    }

    const loadMorePostsClick = async () => {
        let newNumbers = currentLoadedPosts.map(numb => numb + 3)
        setCurrentLoadedPosts(newNumbers)
        console.log(currentLoadedPosts)
        let data = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${loadMorePosts[0]}`).then(res => res.json()),
            fetch(`https://jsonplaceholder.typicode.com/posts/${loadMorePosts[1]}`).then(res => res.json()),
            fetch(`https://jsonplaceholder.typicode.com/posts/${loadMorePosts[2]}`).then(res => res.json())
            ])
            await setLoadedPosts([...loadedPosts, ...data])
            // await fetchLoadedPosts(data)
            let moreNumbers = loadMorePosts.map(numb => numb + 3)
            setLoadMorePosts(moreNumbers)
    }

    const renderLoadMoreList = () => {
        return loadedPosts.map(post => {
            return (
                <div className="post card" key={post.id}>
                    <div className="card-content">
                        {/* <Link to={`/${post.id}`}><span className="card-title">{post.title}</span></Link> */}
                        <span className="card-title">{post.title}</span>
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

    const deleteLoadMorePost = (id) => {
        let newLoadMoreList = loadedPosts.filter(post => post.id !== id)
        setLoadedPosts([...newLoadMoreList])
    }

    return (
        <div className="container">
            <h4 className="center">Home</h4>
            {renderList()}

            {renderLoadMoreList()}
            {renderLoadButton()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        allPosts: state.posts
    }
}

export default connect(mapStateToProps, { getPosts, deletePost, fetchLoadedPosts })(Home)