import {
    Outlet
} from "react-router-dom";

import NavigationBar from '../../components/NavigationBar';

const MainLayout = () => {
    return (
        <div className="layout">
            <NavigationBar />
            
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
