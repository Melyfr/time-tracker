import {useAppSelector} from '../hooks/redux'
import { useDispatch } from "react-redux";
import { activeTaskSlice } from "../store/reducers/ActiveTaskSlice";
import { useEffect, useRef, useState } from "react";
import { tasksApi } from '../store/services/TasksApi';
import ITask from "../interfaces/ITask";
import '../style/TaskCard.css';

interface TaskCardProps {
    task: ITask
}

const TaskCard:React.FC<TaskCardProps> = ({task}) => {
    const dispatch = useDispatch();
    const {togleActiveTask} = activeTaskSlice.actions;
    const {activeTask} = useAppSelector(state => state.activeCardReducer);
    const {activeInterval} = useAppSelector(state => state.activeIntervalReducer);
    const [deleteTask, {}] = tasksApi.useDeleteTaskMutation();

    const [isActive, setIsActive] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerView, setTimerView] = useState('00:00:00');
    const countRef  = useRef<NodeJS.Timeout>();

    const [saveTime, {}] = tasksApi.useSaveTimeMutation();

    useEffect(() => {
            if (activeTask !== task.id) {
                if (isActive) {
                    clearInterval(countRef.current);
                    saveTime({...task, time: {day: task.time.day+timer, week: task.time.week+timer, month: task.time.month+timer}}).then(() => {
                        setTimer(0);
                    });
                    setIsActive(false);
                }
            } else {
                setIsActive(true);
                countRef.current = setInterval(() => {
                    setTimer(timer => timer + 1);
                }, 1000);
            }
    }, [activeTask]);

    useEffect(() => {
        convertTime(timer + task.time[activeInterval]);
    }, [timer, task.time]);

    const convertTime = (time:number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor(time % 3600 / 60);
        const seconds = Math.floor(time % 3600 % 60);
        let hoursView: string, minutesView: string, secondView: string;

        if (hours < 10) {
            hoursView = `0${hours}:`; 
        } else {
            hoursView = `${hours}:`;
        }
        
        if (minutes < 10) {
            minutesView = `0${minutes}:`;
        } else {
            minutesView = `${minutes}:`
        }

        if (seconds < 10) {
            secondView = `0${seconds}`; 
        } else {
            secondView = `${seconds}`
        }

        setTimerView(hoursView + minutesView + secondView) 
    };

    return (
        <article className="task-card" style={{backgroundColor: `${task.bgc}`}}>
            <div className={isActive ? 'task-card__content--active task-card__content' : 'task-card__content'}>
                <h4 className="task-card__title">{task.name}</h4>
                <div className="task-card__time">{timerView}</div>
                <div className="task-card__btns">
                    <div className="task-card__toggle" onClick={() => dispatch(togleActiveTask(task.id))}>{isActive ? 'Stop' : 'Start'}</div>
                    <div className="task-card__toggle" onClick={() => deleteTask(task)}>Delete</div>
                </div>
            </div>
        </article>
    );
}

export default TaskCard;