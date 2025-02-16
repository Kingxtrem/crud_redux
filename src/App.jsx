import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addtask, deletetask, updatetask } from './crud'

const App = () => {
  const tasks = useSelector(state => state.crud.value)
  const dispatch = useDispatch()
  const [task, setTask] = useState('')
  const [id, setId] = useState('')
  const [up, setUp] = useState(false)
  const handlechange = (e) => {
    setTask(e.target.value)
    // console.log(task)
  }
  const addTask = () => {
    dispatch(addtask(task))
    setTask('')
    // console.log(tasks)
  }
  const deleteTask = (index) => {
    dispatch(deletetask(index))
  }
  const editTask = (index) => {
    setTask(tasks[index])
    setId(index)
    setUp(true)
  }
  const updateTask = (index) => {
    dispatch(updatetask({ index, task }))
    setTask('')
    setId('')
    setUp(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-blue-500">TODO LIST</h1>
      <div className='w-[80%] min-h-96 mx-auto mt-5 border border-gray-300 p-5 rounded bg-gray-100'>
        <div className='w-full mx-auto mt-5 flex justify-center gap-5'>
          <input type='text' className='w-full border border-gray-300 rounded p-2' placeholder='Add a new task' onChange={handlechange} value={task} />
          <button className='w-[15%] bg-blue-500 text-white rounded p-2' onClick={up ? (e) => updateTask(id, task) : addTask}>{up ? "Update Task" : "Add Task"}</button>
        </div>
        {tasks.map((task, index) => {
          return (
            <ul className='mt-5' key={index}>
              <li className='border border-gray-300 p-2 rounded mt-2 flex justify-between'>
                <span>{task}</span>
                <div className='flex justify-evenly gap-6' >
                  <button className='bg-red-500 text-white p-1 rounded' onClick={(e) => { editTask(index) }}>Edit</button>
                  <button className='bg-red-500 text-white p-1 rounded' onClick={(e) => deleteTask(index)}>Delete</button>
                </div>
              </li>
            </ul>)
        })}
      </div>
    </div>
  )
}

export default App
