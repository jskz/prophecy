import { Link } from 'react-router-dom';

const NavigationBar = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/jobs">
                    Jobs
                </Link>
            </li>
            <li>
                <Link to="/resources">
                    Resources
                </Link>
            </li>
            <li>
                <Link to="/schedule">
                    Schedule
                </Link>
            </li>
        </ul>
    </nav>
);

export default NavigationBar;