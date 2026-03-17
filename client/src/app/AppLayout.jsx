import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../features/header/Header';
import ModalLayer from '../features/feedback/ModalLayer';
import ToasterLayer from '../features/feedback/ToasterLayer';
import PATHS from '../config/paths';

export default function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== PATHS.FRONT.LOGIN) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <>
      <div className='site-wrapper'>
        <Header />
        <Outlet />
      </div>
      <ModalLayer />
      <ToasterLayer />
    </>
  );
}
