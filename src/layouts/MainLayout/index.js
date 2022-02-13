import { useSelector } from "react-redux";
import {
    Outlet
} from "react-router-dom";

import NavigationBar from '../../components/NavigationBar';

const MainLayout = () => {
    const authenticated = useSelector(state => state.auth.authenticated);

    return (
        <div className="layout">
            {
                authenticated
                ? <NavigationBar />
                : null
            }
            
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
