import { tasksApi } from './store/services/TasksApi';
import TaskCard from './components/TaskCard';
import UserCard from './components/UserCard';
import './style/App.css';
import { useState } from 'react';
import AddCard from './components/AddCard';

export const getAccessToken = ():string => {
  const user = localStorage.getItem('user');
  if (user !== null) {
      return JSON.parse(user).accessToken
  } else {
      return ''
  }
};

const App = () => {
  const [addMode, setAddMode] = useState(false);
  const {data} = tasksApi.useGetTasksQuery(getAccessToken());

  return (
    <div className="container">
      <section className="dashboard">
        <UserCard />
        <div className="dashboard__content">
          {data && data.map(task => 
            <TaskCard key={task.id} task={task}/>
          )}
          {addMode ? <AddCard setAddMode={setAddMode}/> : <div className="dashboard__add" onClick={() => setAddMode(true)}>+</div>}
        </div>
      </section>
    </div>
  );
}

export default App;
