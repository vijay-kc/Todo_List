import React ,{useState} from 'react'
import { useTodo } from '../contexts'
function TodoForm() {
    const [todo,setTodo]= useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault()
        if(!todo)return 
        addTodo({todo,completed: false})
        setTodo("")
    }

  return (
    <form onSubmit={add}  className="flex text-xl bg-white rounded-lg shadow-xl">
          <input
              type="text"
              placeholder="Write Todo..."
              className="text-lg font-sans italic w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 text-black/50 py-1.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-500 text-white shrink-0">
              Add
          </button>
      </form>
  )
}



export default TodoForm