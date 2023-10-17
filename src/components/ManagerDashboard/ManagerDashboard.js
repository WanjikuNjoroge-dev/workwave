// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import './ManagerDashboard.css';

// const ManagerDashboard = () => {
//   const { isAuthenticated } = useContext(AuthContext);
  
//   const [employees, setEmployees] = useState([
//     {
//       name: 'John Doe',
//       tasksCompleted: 'Design Homepage',
//       hoursSpent: 5,
//       taskLink: 'https://task-link.com/1',
//       remainingTasks: 'Design Dashboard',
//       feedback: ''
//     },
//     {
//       name: 'Jane Smith',
//       tasksCompleted: 'Develop API',
//       hoursSpent: 7,
//       taskLink: 'https://task-link.com/2',
//       remainingTasks: 'API Documentation',
//       feedback: ''
//     }
//     // ... Add more employee objects as required
//   ]);

//   // if (!isAuthenticated) {
//   //   return <div>Please register or login to access the Manager Dashboard.</div>;
//   // }

//   return (
//     <div className="manager-dashboard">
//       <h2>Manager Dashboard</h2>
//       <p>Welcome to the manager dashboard. Here you can oversee employee tasks and provide feedback.</p>
      
//       <h3>Employee Tasks Overview</h3>
//       <div className="employee-grid">
//         {employees.map((employee, index) => (
//           <div key={index} className="employee-card">
//             <h4>{employee.name}</h4>
//             <p><strong>Tasks Completed:</strong> {employee.tasksCompleted}</p>
//             <p><strong>Hours Spent:</strong> {employee.hoursSpent}</p>
//             <p><a href={employee.taskLink} target="_blank" rel="noopener noreferrer">View Work</a></p>
//             <p><strong>Remaining Tasks:</strong> {employee.remainingTasks}</p>
//             <textarea 
//               placeholder="Provide feedback..."
//               value={employee.feedback} 
//               onChange={(e) => {
//                 const updatedEmployees = [...employees];
//                 updatedEmployees[index].feedback = e.target.value;
//                 setEmployees(updatedEmployees);
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ManagerDashboard;





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
      feedback: '',
      feedbackRequested: true
    },
    {
      name: 'Jane Smith',
      tasksCompleted: 'Develop API',
      hoursSpent: 7,
      taskLink: 'https://task-link.com/2',
      remainingTasks: 'API Documentation',
      feedback: '',
      feedbackRequested: false
    }
    // ... Add more employee objects as required
  ]);

  // if (!isAuthenticated) {
  //   return <div>Please register or login to access the Manager Dashboard.</div>;
  // }

  return (
    <div className="manager-dashboard">
      <h2>Manager Dashboard</h2>
      <p>Welcome to the manager dashboard. Here you can oversee employee tasks and provide feedback.</p>

      <div className="feedback-requests">
        <h3>Feedback Requests</h3>
        {employees.filter(emp => emp.feedbackRequested).map((employee, index) => (
          <div key={index}>
            <p>{employee.name} has requested feedback for: {employee.tasksCompleted}</p>
          </div>
        ))}
      </div>

      <h3>Employee Tasks Overview</h3>
      <div className="employee-grid">
        {employees.map((employee, index) => (
          <div key={index} className="employee-card">
            <h4>{employee.name}</h4>
            <p><strong>Tasks Completed:</strong> {employee.tasksCompleted}</p>
            <p><strong>Hours Spent:</strong> {employee.hoursSpent}</p>
            <p><a href={employee.taskLink} target="_blank" rel="noopener noreferrer">View Work</a></p>
            <p><strong>Remaining Tasks:</strong> {employee.remainingTasks}</p>
            <textarea 
              placeholder="Provide feedback..."
              value={employee.feedback} 
              onChange={(e) => {
                const updatedEmployees = [...employees];
                updatedEmployees[index].feedback = e.target.value;
                setEmployees(updatedEmployees);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerDashboard;
