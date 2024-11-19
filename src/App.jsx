import { useState, useEffect } from 'react'
import { TodoProvider } from './Context'
import {TodoForm,TodoItem} from './Component'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((lastTodos) => [...lastTodos, { id: Date.now(), ...todo }])
  }

  const updateTodo = (id, todo) => {
    setTodos((lastTodos) => lastTodos.map((ele) => (ele.id === id ? todo : ele)))
    //  ? condition1 : condition2   =====> this is turnery operator
    //  if true       : false
    // so this is jsut like if true give todo else give ele 

  }

  const deleteTodo = (id) => {
    setTodos((lastTodos) =>  lastTodos.filter((ele) => ele.id !== id ))
  }

  const completeTodo = (id) => {
    setTodos((lastTodos) => lastTodos.map((ele) => ele.id === id ? { ...ele, completed: !ele.completed } : ele))
  }

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("reactTodos"))
    if (localTodos && localTodos.length > 0) setTodos(localTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem('reactTodos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, completeTodo }}>
      <div className="bg-[#1e3352] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((ele) => (
              <div className='w-full' key={ele.id}>
                <TodoItem todo={ele} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
