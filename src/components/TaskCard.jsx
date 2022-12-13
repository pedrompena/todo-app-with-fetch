import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export const TaskCard = ({ task }) => {
  const { deleteTask, completeTask } = useContext(TaskContext);

  return (
    <li className="task">
      <div>
        <h3 className="task-title">{task.label}</h3>
        <p className="task-description">{task.description}</p>
      </div>
      <div className="task-actions">
        <i onClick={() => completeTask(task.id)} className={"fa-solid fa-check" + (task.done? " complete" : "")}></i>
        {task.id !== 0? <i onClick={() => deleteTask(task.id)} className="fa-solid fa-xmark"></i> : null}
      </div>
    </li>
  );
};
