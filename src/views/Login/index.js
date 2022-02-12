import { useSelector } from 'react-redux';

function Login() {
    const { token } = useSelector(state => state.auth);

    return (
        <div>
            Login
        </div>
    );
}

export default Login;