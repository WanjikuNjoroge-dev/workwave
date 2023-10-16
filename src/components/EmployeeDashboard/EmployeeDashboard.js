import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [newTask, setNewTask] = useState('');
  const [newTaskLink, setNewTaskLink] = useState('');
  const [tasks, setTasks] = useState([]);

  // if (!isAuthenticated) {
  //     return <div>Please register or login to access the Employee Dashboard.</div>;
  // }

  // const handleAddTask = () => {
  //   if (newTask.trim()) {
  //     const taskObj = {
  //       title: newTask,
  //       status: 'Not Started',
  //       hours: 0,
  //       feedbackRequested: false
  //     };
  //     setTasks([...tasks, taskObj]);
  //     setNewTask('');
  //   }
  // }

  const handleAddTask = () => {
    if (newTask.trim()) {
      const taskObj = {
        title: newTask,
        status: 'Not Started',
        hours: 0,
        taskLink: newTaskLink,  // Link to the task
        feedbackRequested: false
      };
      setTasks([...tasks, taskObj]);
      setNewTask('');
      setNewTaskLink(''); // Reset the link field after adding the task
    }
  }

  const handleStatusChange = (index, status) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = status;
    setTasks(updatedTasks);
  }

  const handleHoursChange = (index, hours) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].hours = hours;
    setTasks(updatedTasks);
  }

  const requestFeedback = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].feedbackRequested = true;
    setTasks(updatedTasks);
  }

  return (
    <div className="dashboard-container">
      <h2>Employee Dashboard</h2>

      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="tasks-grid">
        {tasks.map((task, index) => (
          <div key={index} className="task-card">
            <span className="task-title">{task.title}</span>
            <select value={task.status} onChange={e => handleStatusChange(index, e.target.value)}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <input
              type="number"
              value={task.hours}
              onChange={e => handleHoursChange(index, e.target.valueAsNumber)}
              placeholder="Add hours spent"
            />
            {task.taskLink && <a href={task.taskLink} target="_blank" rel="noopener noreferrer">View Work</a>}
            {!task.feedbackRequested && (
              <button onClick={() => requestFeedback(index)}>
                Request Feedback
              </button>
            )}
            {task.feedbackRequested && <span>Feedback Requested</span>}
          </div>
        ))}
      </div>

      <div className="feedback-corner">
        <h3>Supervisor's Feedback</h3>
        {/* We should get this from backend also ---This is a placeholder. You can render actual feedbacks from the supervisor here. */}
        <p>Excellent work on the XYZ project. Keep it up!</p>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
