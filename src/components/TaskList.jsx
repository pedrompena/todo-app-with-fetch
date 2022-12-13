import { useContext } from "react";

import { TaskContext } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";

export const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <ul className="tasks-list">
      {tasks.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
      <span>{tasks.length} item left</span>
    </ul>
  );
};
