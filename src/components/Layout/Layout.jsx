import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <nav className={css.navbar}>
        <ul className={css.navList}>
          <li className={css.navItem}>
            <NavLink className={css.navLink} to="/">
              Home
            </NavLink>
          </li>
          <li className={css.navItem}>
            <NavLink className={css.navLink} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <Suspense fallback={<ThreeDots
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: 'center' }}
      />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
