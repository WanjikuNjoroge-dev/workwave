import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  const [employees, setEmployees] = useState([
    {
      name: 'John Doe',
      tasksCompleted: 'Design Homepage',
      hoursSpent: 5,
      taskLink: 'https://task-link.com/1',
      remainingTasks: 'Design Dashboard',
      feedback: ''
    },
    {
      name: 'Jane Smith',
      tasksCompleted: 'Develop API',
      hoursSpent: 7,
      taskLink: 'https://task-link.com/2',
      remainingTasks: 'API Documentation',
      feedback: ''
    }
    // ... Add more employee objects as required
  ]);

  // if (!isAuthenticated) {
  //   return <div>Please register or login to access the Manager Dashboard.</div>;
  // }

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <p>Welcome to the manager dashboard. Here you can manage employees and other tasks.</p>
      
      <h3>Employee Tasks Overview</h3>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Tasks Completed</th>
            <th>Hours Spent</th>
            <th>Link to Work</th>
            <th>Remaining Tasks</th>
            <th>Provide Feedback</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.tasksCompleted}</td>
              <td>{employee.hoursSpent}</td>
              <td><a href={employee.taskLink} target="_blank" rel="noopener noreferrer">View Work</a></td>
              <td>{employee.remainingTasks}</td>
              <td>
                <textarea 
                  value={employee.feedback} 
                  onChange={(e) => {
                    const updatedEmployees = [...employees];
                    updatedEmployees[index].feedback = e.target.value;
                    setEmployees(updatedEmployees);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerDashboard;
