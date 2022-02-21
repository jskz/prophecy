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
import SSL from './views/SSL';

import { RequireAuth } from "./util/auth";

const ApplicationRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <RequireAuth>
                            <Jobs />
                        </RequireAuth>
                    } />

                <Route path="login" element={<Login />} />

                <Route
                    path="reporting"
                    element={
                        <RequireAuth>
                            <Reporting />
                        </RequireAuth>
                    } />
                <Route
                    path="ssl"
                    element={
                        <RequireAuth>
                            <SSL />
                        </RequireAuth>
                    } />
                <Route
                    path="resources"
                    element={
                        <RequireAuth>
                            <Resources />
                        </RequireAuth>
                    } />
                <Route
                    path="schedule"
                    element={
                        <RequireAuth>
                            <Schedule />
                        </RequireAuth>
                    } />
                <Route
                    path="settings"
                    element={
                        <RequireAuth>
                            <Settings />
                        </RequireAuth>
                    } />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default ApplicationRouter;