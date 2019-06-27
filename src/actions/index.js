// REDUX THUNK
export const fetch_posts_and_update_id = () => {
    return async (dispatch, getState) => {
        await dispatch(fetchPosts())

        let newNumbs = getState().posts.post_id_to_load.map(numb => numb + 3)
        dispatch(fetchNextPosts(newNumbs))
    }
}

// ACTION TO FETCH API
export const fetchPosts = () => {
    return async (dispatch, getState) => {
        let data = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${getState().posts.post_id_to_load[0]}`).then(res => res.json()),
            fetch(`https://jsonplaceholder.typicode.com/posts/${getState().posts.post_id_to_load[1]}`).then(res => res.json()),
            fetch(`https://jsonplaceholder.typicode.com/posts/${getState().posts.post_id_to_load[2]}`).then(res => res.json())
            ])

        dispatch({ type: 'FETCH_POSTS', payload: data })
    }
}

// ACTION TO UPDATE/INCREASE NEXT ID OF POSTS
export const fetchNextPosts = (numb) => {
    return {
        type: 'FETCH_NEXT_POSTS',
        payload: numb
    }
}

// ACTION TO DELETE POST
export const deletePost = (id) => {
    return {
        type: 'DELETE_POST',
        payload: id
    }
}


