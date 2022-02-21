import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    CalendarIcon,
    ChartPieIcon,
    CogIcon,
    LockClosedIcon,
    LogoutIcon,
    UserGroupIcon,
    ViewListIcon
} from '@heroicons/react/solid';

import { logout } from '../../actions/auth';

const NavigationBar = () => {
    const dispatch = useDispatch();
    const sessionLogout = () => dispatch(logout());

    const MENU_LINKS = [
        { label: 'Jobs', to: '/', MenuItemIcon: ViewListIcon },
        { label: 'Resources', to: '/resources', MenuItemIcon: UserGroupIcon },
        { label: 'Schedule', to: '/schedule', MenuItemIcon: CalendarIcon },
        { label: 'Reporting', to: '/reporting', MenuItemIcon: ChartPieIcon },
        { label: 'SSL', to: '/ssl', MenuItemIcon: LockClosedIcon },
        { label: 'Settings', to: '/settings', MenuItemIcon: CogIcon }
    ];

    return (
        <div className="bg-indigo-800 text-white">
            <div className="flex">
                <div className="flex flex-grow primary-menu">
                    {
                        MENU_LINKS.map((menuLink, index) => (
                            <Link to={menuLink.to} key={index}>
                                <div className="py-4 px-6 hover:bg-indigo-700 flex items-center">
                                    <menuLink.MenuItemIcon className="inline-flex w-[24px]" />

                                    <span className="pl-2">{menuLink.label}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className="flex">
                    <div className="py-4 px-6 hover:bg-indigo-700 flex items-center hover:cursor-pointer" onClick={sessionLogout}>
                        <LogoutIcon className="inline-flex w-[24px]" />

                        <span className="pl-2">Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;