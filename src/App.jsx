import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Tasks } from './pages/Tasks';
import Tasks from './pages/Tasks.jsx';
import TasksDone from './pages/TasksDone.jsx';
import TasksImportant from './pages/TasksImportant.jsx';
import TasksPending from './pages/TasksPending.jsx';
import TasksSearch from './pages/TasksSearch.jsx';

export const App = () => {
  return (
    <Router>
        <div className="App">
            <Routes>
              <Route path="/" element={<Tasks />}/>
              <Route path="/done_tasks" element={<TasksDone/>}/>
              <Route path="/pending_tasks" element={<TasksPending />}/>
              <Route path="/important_tasks" element={<TasksImportant/>}/>
              <Route path="/search_tasks" element={<TasksSearch />}/>
            </Routes>
        </div>
    </Router>
  )
}

export default App;
