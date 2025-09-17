import { useEffect } from 'react';
import { useNavigate } from "react-router";
import Hierarchy from '../components/Hierarchy/Hierarchy';
import BaseLayout from '../layouts/Base';

function Root() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    // If not logged in, redirect to login page
    if (!user) {
      navigate("/login", { replace: true });
    }
  })

  // While redirecting, don't render anything
  if (!user) return null;

  return (
    <BaseLayout>
      <main id="main">
        <h1>Hierarchy Tree</h1>
        <div className="hierarchy-container">
          <Hierarchy />
        </div>
      </main>
    </BaseLayout>
  )
}

export default Root;
