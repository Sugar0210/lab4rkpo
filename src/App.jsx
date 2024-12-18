import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoPage from './screens/ToDoPage';
import DndPage from './screens/DndPage';

function App() {
  return (
    <Router>
      <div>
        <nav style={{
          display: 'flex',
          color: 'white'
        }}>
          <Link to="/" style={{
            marginRight: 20,
            color: 'white',
            textDecoration: 'underline',
            fontSize: 20
          }}>
            Kanban
          </Link>
          <Link to="/todo" style={{
            marginRight: 20,
            color: 'white',
            textDecoration: 'underline',
            fontSize: 20
          }}>
            To-Do List
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<DndPage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;