import { combineReducers } from 'redux'

const INITIAL_STATE = {
    post_id_to_load: [1,2,3],
    allPosts: []
}

const posts = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'FETCH_POSTS':
            return {
                ...state,
                allPosts: [...state.allPosts, ...action.payload]
            }
        case 'FETCH_NEXT_POSTS':
            return {
                ...state,
                post_id_to_load: [...action.payload]
            }
        case 'DELETE_POST':
                let newPosts = state.allPosts.filter(post => post.id !== action.payload)
                return {
                    ...state,
                    allPosts: [...newPosts]
                }
        default: 
            return state
    }
}

export default combineReducers({
    posts: posts
})