import { useState } from 'react';
import { encode } from '../../utils/encode';
import { fetchUserIdByEncodedString, fetchUserById } from '../../utils/api';
import type { User } from '../../types';
import './LoginForm.css';

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Encode the email and password
    const encoded = encode(email, password) as string;

    try {
      // Fetch user ID using the encoded string
      const userId = await fetchUserIdByEncodedString(encoded);
      if (!userId) {
        setIsLoading(false);
        setErrorMessage('Invalid credentials - user not found');
        return;
      }

      // Fetch user data using the user ID
      const userData = await fetchUserById(userId);
      if (userData) onLoginSuccess(userData);
      else setErrorMessage('User data not found');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="login-form">
      <fieldset className="login-form__fieldset">
        <label className="login-form__label">
          <span className="login-form__label-text">email address:</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className="login-form__label">
          <span className="login-form__label-text">password:</span>
          <input name="password" type="password" required />
        </label>
      </fieldset>
      <button type="submit" className="login-form__submit primary">
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      {errorMessage && <div className="login-form__error" role="alert">{errorMessage}</div>}
    </form>
  );
};

export default LoginForm;
