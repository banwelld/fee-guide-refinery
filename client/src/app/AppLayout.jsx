import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../features/header/components/Header';
import ModalLayer from '../components/ui/feedback/ModalLayer';
import ToasterLayer from '../components/ui/feedback/ToasterLayer';
import PATHS from '../config/paths';

export default function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== PATHS.FRONT.HOME) {
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
