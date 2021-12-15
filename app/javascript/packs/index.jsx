// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import App from '../components/App'
import Dashboard from '../components/Tasks/Dashboard'
import TaskDetails from '../components/Task/TaskDetails'
import Today from '../components/Day/Today'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/taskdetails" element={<TaskDetails />} />
            <Route path="/today" element={<Today />} />
          </Route>
        </Routes>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
