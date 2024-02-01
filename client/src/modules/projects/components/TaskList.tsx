import React, { useState } from 'react';
import '../assets/styles/TaskList.css';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = 'checked' + updatedTasks[index];
    setTasks(updatedTasks);
  };

  return (
    <div className="task-list">
      <ul id="myUL">
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => toggleTask(index)}
            className={task.startsWith('checked') ? 'checked' : ''}
          >
            {task.replace('checked', '')}
            <span className="close" onClick={() => removeTask(index)}>
              &times;
            </span>
          </li>
        ))}
        <li>Hit the gym</li>
        <li className="checked">Pay bills</li>
        <li>Meet George</li>
        <li>Buy eggs</li>
      </ul>
    </div>
  );
};

export default TaskList;
