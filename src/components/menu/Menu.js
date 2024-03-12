import { Link } from 'react-router-dom';
import './menu.css';

export default function Menu() {
    return (
        <div className='menu'>
            <div className='heading'>Daily Dash</div>
            <div className='menu_buttons'>
                <Link to="/todo"><button className='todo_button'>Todo</button></Link>
                <Link to="/timer"><button className='timer_button'>Timer</button></Link>
            </div>
        </div>
    );
}
