import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts, deletePost } from '../actions'

const Home = ({ getPosts, deletePost, allPosts }) => {
    const [currentLoadedPosts, setCurrentLoadedPosts] = useState([1,2,3])
    

    useEffect(() => {
        fetchData()
    }, [currentLoadedPosts])

    // const fetchData = async () => {
    //     await Promise.all([
    //         fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()),
    //         fetch('https://jsonplaceholder.typicode.com/posts/2').then(res => res.json()),
	// 		fetch('https://jsonplaceholder.typicode.com/posts/3').then(res => res.json())
    //         ])
    //         .then((data) => {
    //            getPosts(data)
    //         })
    //         console.log(numberPostsListed)
    // }

    const fetchData = async () => {
        let data = await Promise.all([
                        fetch(`https://jsonplaceholder.typicode.com/posts/${currentLoadedPosts[0]}`).then(res => res.json()),
                        fetch(`https://jsonplaceholder.typicode.com/posts/${currentLoadedPosts[1]}`).then(res => res.json()),
                        fetch(`https://jsonplaceholder.typicode.com/posts/${currentLoadedPosts[2]}`).then(res => res.json())
                        ])
        await getPosts(data)
            console.log(currentLoadedPosts)
            // let newNumbers = currentLoadedPosts.map(numb => numb + 3)
            // setCurrentLoadedPosts([...newNumbers])
    }

    // RENDERS FIRST 3 POSTS 
    const renderList = () => {
        if(allPosts) {
            return allPosts.map(post => {
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
            return <button onClick={testClick} style={{display: 'block', margin: 'auto'}} className="btn waves-effect waves-light">
                Load more
            </button>
        }
        return null
    }

    const testClick = () => {
        console.log(currentLoadedPosts)
        let newNumbers = currentLoadedPosts.map(numb => numb + 3)
            setCurrentLoadedPosts([...newNumbers])
    }

    return (
        <div className="container">
            <h4 className="center">Home</h4>
            {renderList()}
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