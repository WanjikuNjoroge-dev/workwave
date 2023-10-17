import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [submittedTasks, setSubmittedTasks] = useState([]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const taskObj = {
        title: newTask,
        status: 'Not Started',
        hours: 0,
        feedbackRequested: false
      };
      setTasks([...tasks, taskObj]);
      setNewTask('');
    }
  }

  const handleStatusChange = (index, status) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = status;
    setTasks(updatedTasks);
  }

  const handleHoursChange = (index, hours) => {
    if (tasks[index].status !== 'In Progress' && tasks[index].status !== 'Not Started') {
      const updatedTasks = [...tasks];
      updatedTasks[index].hours = hours;
      setTasks(updatedTasks);
    }
  }

  const handleFeedbackRequest = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].feedbackRequested = true;
    setTasks(updatedTasks);
  }

  const handleFormSubmit = () => {
    // Send tasks data to the database using an API request
    fetch('http://localhost/workwave/employeedashboardadd.php', {
      method: 'POST',
      body: JSON.stringify(tasks),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Tasks submitted:', data);
        // Reset the tasks once submitted
        setTasks([]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Use useEffect to fetch and display submitted tasks
  useEffect(() => {
    fetch('http://localhost/workwave/employeedashboardretrieve.php')
      .then((response) => response.json())
      .then((data) => {
        setSubmittedTasks(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Employee Dashboard</h2>

      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <table className="tasks-table">
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Status</th>
            <th>Hours Spent</th>
            <th>Request Feedback</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={task.hours}
                  onChange={(e) => handleHoursChange(index, e.target.valueAsNumber)}
                  disabled={task.status === 'In Progress' || task.status === 'Not Started'}
                />
              </td>
              <td>
                {task.feedbackRequested ? (
                  <span>Feedback Requested</span>
                ) : (
                  <button
                    onClick={() => handleFeedbackRequest(index)}
                    disabled={task.status === 'In Progress' || task.status === 'Not Started'}
                  >
                    Request Feedback
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleFormSubmit}>Submit Tasks</button>

      <h3>Submitted Tasks</h3>
      <table className="submitted-tasks-table">
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Status</th>
            <th>Hours Spent</th>
            <th>Feedback Requested</th>
          </tr>
        </thead>
        <tbody>
          {submittedTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.hours}</td>
              <td>{task.feedbackRequested ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeDashboard;
