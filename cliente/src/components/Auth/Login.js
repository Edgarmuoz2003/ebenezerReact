import { useAuth } from './AuthProvider';

const Login = () => {
  const { login } = useAuth()

  const handleLogin = () => {
    login();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
