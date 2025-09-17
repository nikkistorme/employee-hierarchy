import type { User } from '../../types';
import { NavLink } from "react-router";
import './Header.css';

const Header = () => {
  const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') as string) as User : null;

  return (
    <header className="header">
      <div className="header__inner">
        {user && (
          <div className="header__user-info">
            <div className="header__user-name">
              <span className="header__user-name">
                <span className="sr-only">Logged in as: </span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="header__user-logout">
              <span aria-hidden="true">&#40;</span>
              <NavLink to="/logout" className="header__logout-link">Logout</NavLink>
              <span aria-hidden="true">&#41;</span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;