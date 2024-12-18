import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import TodoList from '../components/ToDoList';

function ToDoPage() {
   const [todos, setTodos] = useState([
      { id: 1, title: 'Почитать', completed: false },
      { id: 2, title: 'Поспать', completed: false },
   ]);
   const [newTodo, setNewTodo] = useState('');
   const [filter, setFilter] = useState('all');

   const toggleTodo = (id) => {
      setTodos(
         todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
         )
      );
   };

   const addTodo = (e) => {
      e.preventDefault();
      if (!newTodo) return;
      const newTodoItem = {
         id: Date.now(),
         title: newTodo,
         completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
   };

   const deleteTodo = (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
   };

   const filteredTodos = todos.filter((todo) => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'active') return !todo.completed;
      return true; // 'all'
   });

   return (
      <main>
         <h1>My To-Do List</h1>
         <Link to="/">Go to DnD</Link>
         <form onSubmit={addTodo}>
            <input
               type="text"
               value={newTodo}
               onChange={(e) => setNewTodo(e.target.value)}
               placeholder="Add new task..."
            />
            <button type="submit">Add</button>
         </form>
         <div>
            <button onClick={() => setFilter('all')}>All</button>
            <button onClick={() => setFilter('active')}>Active</button>
            <button onClick={() => setFilter('completed')}>Completed</button>
         </div>
         <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </main>
   );
}

export default ToDoPage;