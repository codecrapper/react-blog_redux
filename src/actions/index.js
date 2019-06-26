export const getPosts = (posts_data) => {
    return {
        type: 'GET_POSTS',
        payload: posts_data
    }
}

export const deletePost = (id) => {
    return {
        type: 'DELETE_POST',
        payload: id
    }
}

export const fetchLoadedPosts = (posts) => {
    return {
        type: 'FETCH_LOADED_POSTS',
        payload: posts
    }
}

export const nextPostsToLoad = (numbs) => {
    return {
        type: 'NEXT_POSTS_TO_LOAD',
        payload: numbs
    }
}

export const deleteLoadedPost = (id) => {
    return {
        type: 'DELETE_LOADED_POST',
        payload: id
    }
}