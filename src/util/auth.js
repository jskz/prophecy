import { useSelector } from 'react-redux';
import {
    useLocation,
    Navigate
} from 'react-router-dom';

export const RequireAuth = function ({ children }) {
    const { authenticated } = useSelector(state => state.auth);
    const location = useLocation();

    if (!authenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
