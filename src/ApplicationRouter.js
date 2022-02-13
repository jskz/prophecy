import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Layout from './layouts/MainLayout';

import Login from './views/Login';
import Jobs from './views/Jobs';
import Reporting from './views/Reporting';
import Resources from './views/Resources';
import Schedule from './views/Schedule';
import Settings from './views/Settings';

const ApplicationRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Jobs />} />

                <Route path="login" element={<Login />} />
                <Route path="reporting" element={<Reporting />} />
                <Route path="resources" element={<Resources />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default ApplicationRouter;