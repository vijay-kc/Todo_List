import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import TodoForm from './Components/TodoForm'
import Todoitem from './Components/Todoitem'
import './App.css'


function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) =>{
    setTodos((prev) => [{id: Date.now(),...todo},...prev])
  }

  const updateTodo =(id,todo) =>{
    setTodos((prev) => prev.map((prevTodo)=>(prevTodo.id === id ? todo:prevTodo)))
  }

  const deleteTodo =(id) =>{
    setTodos((prev) =>prev.filter((todo) =>todo.id !== id))
  }

  const toggleComplete = (id) =>{
    setTodos((prev) =>
    prev.map((prevTodo) =>
    prevTodo.id === id ?{...prevTodo,
    completed: !prevTodo.completed}:prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length >0){
      setTodos(todos)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  return (
    <>
      <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
       <div className=" min-h-screen py-8  bg-local ">
          <div className=" bg-sky-100
          opacity-80 shadow-2xl w-full max-w-2xl mx-auto rounded-lg px-4 py-3 text-sky-600">
              <h1 className=" font-sans italic  text-4xl font-bold text-center mb-8 mt-1">Manage Your Todos</h1>
              <div className="mb-4">
                  {/* Todo form goes here */} 
                  <TodoForm/>
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
                  {todos.map((todo) =>(
                    <div key={todo.id}
                      className='w-full'
                    >
                      <Todoitem todo={todo} />
                    </div>
                  ))}
              </div>
          </div>
        </div> 
      </TodoProvider>
    </>
  )
}

export default App
