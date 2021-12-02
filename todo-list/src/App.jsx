import React, { useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import {  v4 as uuidv4} from "uuid"



const KEY = "todoAPP.todos";

export function App() {
const  [todos, setTodos] = useState([{id: 1, task: "Tarea 1", completed: false }])
  
const todoTaskRef = useRef();

useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if(storedTodos)
    setTodos(storedTodos);
    }, []);

useEffect(() => {
localStorage.setItem(KEY, JSON.stringgify(todos))
}, [todos]);

const toggleTodo = (id) => {
         const newTodos = [...todos]; //estamos creando una copia del array "todos"
         const todo = newTodos.find((todo) => todo.id === id); //aca vamos al todo correspondiente a la "id"
         todo.completed = !todo.completed; // aca basicamente cambiamos el bolean si esta false ---> true y viceversa;
         setTodos(newTodos);
        };

const handleTodoAdd = () => {
  const task = todoTaskRef.current.value;
  if(task  === "" ) return;
  //aca le estas diciendo que si la tarea es un string que te devuelva lo tipeado en el "setTodos"

  setTodos((prevTodos) => {
     return[...prevTodos, {id: uuidv4(), task, completed: false }]
  })

  todoTaskRef.current.value = null;
 //esto es para blanquear el casillero del input} 
};
    

return( 
    <React.Fragment>
       <TodoList todos= {todos} toggleTodo={toggleTodo} /> 
       <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
       <button onClick={handleTodoAdd}>+</button>
       <button>-</button>
       <div>
           Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar
       </div>
      
    </React.Fragment> )
}
 /* div"con la cant de tareas" con esta linea lo que hacemos es enumerar la cantida de tareas que falten segun las ingresadas en el todoItem */
//"togleTodos" como prop y le pasamos a la funcion misma, se pasa como propiedad de todoList
//en tidiItem se resive esa prop