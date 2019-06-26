import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import LoadedPost from './components/LoadedPost'
import Post from './components/Post'
import Footer from './components/Footer'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/loaded/:post_id" component={LoadedPost} />
                        <Route path="/:post_id" component={Post} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}

export default App