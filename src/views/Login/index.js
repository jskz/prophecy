import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useNavigate,
    useLocation,
} from 'react-router-dom';

import { loginWithRememberedToken } from '../../actions/auth';

function Login() {
    const [storedToken] = useState(localStorage.getItem('token'));
    const [remember, setRemember] = useState(false);

    const dispatch = useDispatch();
    const { authenticated } = useSelector(state => state.auth);
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = useCallback((ev) => {
        ev.preventDefault();

        dispatch({ type: 'LOGIN_SUCCESS' });
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });

        if (remember) {
            localStorage.setItem('token', 'example-token');
        }

        return false;
    }, [remember, location, dispatch, navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            dispatch(loginWithRememberedToken(token));
        }
    }, [dispatch]);

    useEffect(() => {
        if (authenticated) {
            navigate('/', { replace: true });
        }
    }, [authenticated, navigate]);

    if (storedToken) {
        return (
            <div className="bg-gray-300">
                <div className="min-h-[100vh]" />
            </div>
        );
    }

    return (
        <div className="bg-gray-300">
            <div className="min-h-[100vh] flex flex-col justify-center py-12 px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        checked={remember}
                                        onChange={() => setRemember(!remember)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;