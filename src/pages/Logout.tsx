import { useEffect } from "react";
import { useNavigate } from "react-router";
import BaseLayout from "../layouts/Base";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('user');
    navigate('/login');
  });

  return (
    <BaseLayout>
      <main id="main">
        <h1>Logging out...</h1>
      </main>
    </BaseLayout>
  );
};

export default Logout;