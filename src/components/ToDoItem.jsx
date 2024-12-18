import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
   return (
      <div class="todo-item">
         <div class="item-info">
            <input
               type="checkbox"
               checked={todo.completed}
               onChange={() => toggleTodo(todo.id)}
               class="checkbox"
            />
            <span class="item-title">{todo.title}</span>
         </div>
         <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
   );
}

export default TodoItem;