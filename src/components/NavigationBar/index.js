import { Link } from 'react-router-dom';

import {
    CalendarIcon,
    ChartPieIcon,
    CogIcon,
    UserGroupIcon,
    ViewListIcon
} from '@heroicons/react/solid';

const NavigationBar = () => {
    const MENU_LINKS = [
        { label: 'Jobs', to: '/', MenuItemIcon: ViewListIcon },
        { label: 'Resources', to: '/resources', MenuItemIcon: UserGroupIcon },
        { label: 'Schedule', to: '/schedule', MenuItemIcon: CalendarIcon },
        { label: 'Reporting', to: '/reporting', MenuItemIcon: ChartPieIcon },
        { label: 'Settings', to: '/settings', MenuItemIcon: CogIcon }
    ];

    return (
        <div className="bg-indigo-800 text-white">
            <div className="flex">
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
        </div>
    );
};

export default NavigationBar;