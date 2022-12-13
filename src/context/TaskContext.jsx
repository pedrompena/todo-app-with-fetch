import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);

  const createTask = (taskLabel, taskDescription) => {
    setTasks([
      ...tasks,
      {
        id: tasks.length,
        label: taskLabel,
        description: taskDescription,
        done: false,
      },
    ]);
  }; 

  const getTasks = async () => {
    const response = await fetch(
      "http://assets.breatheco.de/apis/fake/todos/user/s3rtr3s"
    );
    const data = await response.json();
    setTasks(data);
  };

  const putTasks = () => {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/s3rtr3s", {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error("error", error));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const completeTask = (taskId) => {
    const check = [];
    tasks.map((task, i) => {
      if (task.id === taskId) {
        task.done = !task.done;
        check.splice(i, task);
      }
      check.push(task);
    });
    setTasks(check);
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    tasks.length ? putTasks() : null;
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        deleteTask,
        createTask,
        completeTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
