// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import App from '../components/App'
import Dashboard from '../components/Dashboard/Dashboard'
import TaskDetails from '../components/Task/TaskDetails'
import Today from '../components/Day/Today'
import UpdateTask from '../components/Task/UpdateTask'
import AllTasks from '../components/AllTasks/AllTasks'
import AddTask from '../components/AddTask/AddTask'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route exact path="tasks" element={<AllTasks />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks/:id" element={<TaskDetails />}>
              <Route path="edit" element={<UpdateTask />} />
            </Route>
            <Route path="today" element={<Today />} />
            <Route path="addtaskadvanced" element={<AddTask isQuickTask={false} />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
