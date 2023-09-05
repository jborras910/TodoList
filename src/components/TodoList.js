import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    // Save todos to localStorage
    localStorage.setItem("todos", JSON.stringify(newTodos));

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    // Update the todos array with the new value
    const updatedTodos = todos.map((item) =>
      item.id === todoId ? { ...item, text: newValue.text } : item
    );

    // Save the updated todos to localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    // Save todos to localStorage
    localStorage.setItem("todos", JSON.stringify(removedArr));

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    // Save todos to localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTodos(updatedTodos);
  };

  return (
    <>
      <TodoForm onSubmit={addTodo} />

      {todos.length === 0 ? <p>No todo</p> : <p>Todo Count: {todos.length} </p>}

      <br />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
