import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/redux';
import { activeIntervalSlice, interval } from '../store/reducers/ActiveIntervalSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { activeTaskSlice } from '../store/reducers/ActiveTaskSlice';
import '../style/UserCard.css'

const UserCard:React.FC = () => {
    const dispatch = useDispatch();
    const {activeInterval} = useAppSelector(state => state.activeIntervalReducer);
    const {setActiveInterval} = activeIntervalSlice.actions;
    const {togleActiveTask} = activeTaskSlice.actions;
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState(false);

    const [userName, setUserName] = useState(() => {
        const user = localStorage.getItem('user');
        if (user !== null) {
            return JSON.parse(user).name
        } else {
            return ''
        }
    });

    const logoutHandler = () => {
        
        localStorage.removeItem("user");
        navigate('/login');
    };

    const changeIntervalHandler = (interval:interval) => {
        dispatch(togleActiveTask(-1));
        dispatch(setActiveInterval(interval));
    };

    return (
        <div className="user-card">
            <div className="user-card__body">
                <div className='user-card__text'>
                    <p className="user-card__subtitle">Report for</p>
                    <p className="user-card__title">{userName}</p>
                </div>
            </div>
            <ul className={activeNav ? "user-card__nav user-card__nav--active" : "user-card__nav"}>
                <li className={activeInterval === 'day' ? 'user-card__nav-item user-card__nav-item--active' : 'user-card__nav-item'} onClick={() =>  changeIntervalHandler(interval.day)}>Daily</li>
                <li className={activeInterval === 'week' ? 'user-card__nav-item user-card__nav-item--active' : 'user-card__nav-item'} onClick={() => changeIntervalHandler(interval.week)}>Weekly</li>
                <li className={activeInterval === 'month' ? 'user-card__nav-item user-card__nav-item--active' : 'user-card__nav-item'} onClick={() => changeIntervalHandler(interval.month)}>Monthly</li>
                <li className='user-card__nav-bottom'>
                    <span onClick={logoutHandler} className='user-card__nav-item'>Log out</span>
                    <span onClick={() => setActiveNav(!activeNav)} className='user-card__nav-toggle'></span>
                </li>
            </ul>
        </div>
    );
};

export default UserCard;