import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Layout from './layouts/MainLayout';

import Home from './views/Home';
import Login from './views/Login';
import Jobs from './views/Jobs';
import Resources from './views/Resources';
import Schedule from './views/Schedule';

const ApplicationRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                
                <Route path="login" element={<Login />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="resources" element={<Resources />} />
                <Route path="schedule" element={<Schedule />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default ApplicationRouter;