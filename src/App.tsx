import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "./hooks.js";
import { addTask as addTaskAction, deleteTask as deleteTaskAction, updateTask as updateTaskAction } from "./crud.js";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const tasks = useAppSelector((state) => state.crud.value);
  const dispatch = useAppDispatch();
  const [task, setTask] = useState<string>("");
  const [id, setId] = useState<number | null>(null);
  const [up, setUp] = useState<boolean>(false);

  const errorNotify = (): void => {
    toast.error("Please add a ToDo!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
  const successNotify = (): void => {
    toast.success('ToDo added successfully', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };
  const handleAddTask = () => {
    if (!task.trim()) {
      errorNotify();
      return;
    }
    dispatch(addTaskAction(task.trim()));
    setTask("");
    successNotify();
  };

  const handleDeleteTask = (index: number): void => {
    dispatch(deleteTaskAction(index));
  };

  const editTask = (index: number): void => {
    setTask(tasks[index] ?? "");
    setId(index);
    setUp(true);
  };

  const handleUpdateTask = (): void => {
    if (!task.trim()) {
      errorNotify();
      return;
    }
    if (id === null) return;
    dispatch(updateTaskAction({ index: id, task: task.trim() }));
    setTask("");
    setId(null);
    setUp(false);
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"

      />
      <h1 className="text-3xl font-bold text-center text-blue-500">
        TODO LIST
      </h1>
      <div className="sm:w-[80%] min-w-fit min-h-96 mx-auto mt-5 border border-gray-300 p-5 rounded bg-gray-100">
        <div className="w-full mx-auto mt-5 flex justify-center gap-5">
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Add a new task"
            onChange={handlechange}
            value={task}
          />
          <button
            className={"sm:w-[15%] min-w-fit bg-blue-500 text-white rounded p-2 flex-nowrap text-nowrap"}
            onClick={up ? handleUpdateTask : handleAddTask}
            disabled={!task.trim()}
          >
            {up ? "Update Task" : "Add Task"}
          </button>

        </div>
        {tasks.map((taskItem: string, index: number) => {
          return (
            <ul className="mt-5" key={index}>
              <li className="border border-gray-300 p-2 rounded mt-2 flex justify-between">
                <span>{taskItem}</span>
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
                    onClick={(e) => handleDeleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default App;
