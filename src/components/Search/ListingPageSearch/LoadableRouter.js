import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const LoadableRouter = ({ element, path }) => {
    return (
        <Router>
            <Routes>
                <Route path={path} element={element}></Route>
            </Routes>
        </Router>
    )
}

export default LoadableRouter
