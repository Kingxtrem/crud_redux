import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addtask, deletetask, updatetask } from "./crud";
// import ReduxApiSetUp from "./components/ReduxApiSetUp";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const tasks = useSelector((state) => state.crud.value);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [id, setId] = useState("");
  const [up, setUp] = useState(false);
  const [empty, setEmpty] = useState(false);
  
  const errorNotify = () =>{
    toast.error("Please add a ToDo!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
     
    });}
    const successNotify=()=>{
    toast.success('ToDo added successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });}
  const handlechange = (e) => {
    setTask(e.target.value);
  };
  const addTask = () => {
    if (task.length == 0) {
      errorNotify();
      setEmpty(true)
      setTimeout(() => {
        setEmpty(false)
      },1000);
    } else {
      dispatch(addtask(task));
      setTask("");
      successNotify();
    }
    // console.log(tasks)
  };
  const deleteTask = (index) => {
    dispatch(deletetask(index));
  };
  const editTask = (index) => {
    setTask(tasks[index]);
    setId(index);
    setUp(true);
  };
  const updateTask = (index) => {
    dispatch(updatetask({ index, task }));
    setTask("");
    setId("");
    setUp(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-blue-500">
        TODO LIST
      </h1>
      <div className="w-[80%] min-h-96 mx-auto mt-5 border border-gray-300 p-5 rounded bg-gray-100">
        <div className="w-full mx-auto mt-5 flex justify-center gap-5">
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Add a new task"
            onChange={handlechange}
            value={task}
          />
          <button
            className={empty?"w-[15%] text-white rounded p-2 bg-black":"w-[15%] bg-blue-500 text-white rounded p-2 "  }
            onClick={up ? (e) => updateTask(id, task) : addTask} disabled={empty?true:false}
          >
            {up ? "Update Task" : "Add Task"}
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            
          />
        </div>
        {tasks.map((task, index) => {
          return (
            <ul className="mt-5" key={index}>
              <li className="border border-gray-300 p-2 rounded mt-2 flex justify-between">
                <span>{task}</span>
                <div className="flex justify-evenly gap-6">
                  <button
                    className="bg-green-500 text-white p-1 rounded"
                    onClick={(e) => {
                      editTask(index);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded"
                    onClick={(e) => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
      {/* <ReduxApiSetUp/> */}
    </div>
  );
};

export default App;
