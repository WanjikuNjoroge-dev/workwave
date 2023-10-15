// // import React, { useContext } from 'react';
// // import { AuthContext } from '../../contexts/AuthContext';

// // const EmployeeDashboard = () => {
// //   const { isAuthenticated } = useContext(AuthContext);

// //   if (!isAuthenticated) {
// //     return <div>Please register or login to access the Employee Dashboard.</div>;
// //   }

// //   return (
// //     <div>
// //       <h2>Employee Dashboard</h2>
// //       <p>Welcome to the employee dashboard. Here you can manage your tasks and view reports.</p>
// //     </div>
// //   );
// // }

// // export default EmployeeDashboard;



// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import './EmployeeDashboard.css';

// const EmployeeDashboard = () => {
//     const { isAuthenticated } = useContext(AuthContext);

//     const [task, setTask] = useState('');
//     const [tasks, setTasks] = useState([]);
//     const [startTime, setStartTime] = useState(null);
//     const [endTime, setEndTime] = useState(null);

//     if (isAuthenticated) {
//         return <div>Please register or login to access the Employee Dashboard.</div>;
//     }

//     const handleTaskSubmit = () => {
//         setTasks(prevTasks => [...prevTasks, task]);
//         setTask('');
//     }

//     return (
//         <div className="dashboard-container">
//             <h2>Employee Dashboard</h2>

//             <div className="time-recording">
//                 <h3>Time Recording</h3>
//                 <button onClick={() => setStartTime(new Date())}>Start Time</button>
//                 <button onClick={() => setEndTime(new Date())}>End Time</button>
//                 {startTime && <p>Started at: {startTime.toLocaleTimeString()}</p>}
//                 {endTime && <p>Ended at: {endTime.toLocaleTimeString()}</p>}
//             </div>

//             <div className="task-management">
//                 <h3>Daily Deliverables Input</h3>
//                 <input 
//                     type="text"
//                     value={task}
//                     onChange={e => setTask(e.target.value)}
//                     placeholder="Enter your task"
//                 />
//                 <button onClick={handleTaskSubmit}>Add Task</button>
//                 <ul>
//                     {tasks.map((t, index) => <li key={index}>{t}</li>)}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default EmployeeDashboard;




import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  const [morningTask, setMorningTask] = useState('');
  const [todayGoals, setTodayGoals] = useState('');
  
  const [todayTask, setTodayTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState('');
  const [taskLink, setTaskLink] = useState('');
  const [hoursUtilized, setHoursUtilized] = useState('');
  const [supervisorFeedback, setSupervisorFeedback] = useState('');

  if (isAuthenticated) {
    return <div>Please register or login to access the Employee Dashboard.</div>;
  }

  
  return (
    <div className="dashboard-container">
      <div className="dashboard-form">
        <h3>Morning Entry</h3>
        <label>Morning Task:</label>
        <textarea value={morningTask} onChange={e => setMorningTask(e.target.value)} />
        
        <label>Goals for Today:</label>
        <textarea value={todayGoals} onChange={e => setTodayGoals(e.target.value)} />
      </div>
      
      <div className="dashboard-form">
        <h3>Evening Entry</h3>
        <label>Tasks Completed Today:</label>
        <textarea value={completedTasks} onChange={e => setCompletedTasks(e.target.value)} />
        
        <label>Link to Tasks:</label>
        <input type="text" value={taskLink} onChange={e => setTaskLink(e.target.value)} />

        <label>Hours Utilized:</label>
        <input type="text" value={hoursUtilized} onChange={e => setHoursUtilized(e.target.value)} />
        
        <label>Feedback from Supervisor:</label>
        <textarea value={supervisorFeedback} onChange={e => setSupervisorFeedback(e.target.value)} />
        
        <button className="dashboard-button">Submit Entry</button>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
