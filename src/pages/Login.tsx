import { useEffect } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm/LoginForm";
import BaseLayout from "../layouts/Base";
import type { User } from "../types";

const Login = () => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    // If logged in, redirect to hierarchy page
    if (user) {
      navigate("/", { replace: true });
    } else {
      // Dynamic page title
      document.title = 'Login - Employee Hierarchy';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginSuccess = (userData: User) => {
    // Store user data in session storage (for pseudo-authentication)
    sessionStorage.setItem('user', JSON.stringify(userData));

    navigate("/");
  };

  return (
    <BaseLayout>
      <main id="main" className="login-page">
        <h1>Please login</h1>
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
        />
      </main>
    </BaseLayout>
  )
};

export default Login;