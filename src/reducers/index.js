import { combineReducers } from 'redux'

// Add or delete posts
const posts = (state = [], action) => {
    switch(action.type) {
        case 'GET_POSTS':
            return [...state, ...action.payload]
        case 'DELETE_POST':
            let newPosts = state.filter(post => post.id !== action.payload)
            return [...newPosts]
        default: 
            return state
    }
}




export default combineReducers({
    posts: posts

})