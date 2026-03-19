import { Outlet } from 'react-router-dom';

import { UserProvider } from '../features/user/context/UserContext';
import { CollectionProvider } from '../features/collection/context/CollectionContext';
import { ModalProvider } from '../features/feedback/context/ModalContext';
import { FeeGuideProvider } from '../features/collection/context/FeeGuideContext';
import useUser from '../features/user/context/useUser';
import ScrollToHash from '../components/ScrollToHash';

export default function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <AppProviders>
          <ScrollToHash />
          <Outlet />
        </AppProviders>
      </ModalProvider>
    </UserProvider>
  );
}

function AppProviders({ children }) {
  const userContext = useUser();
  const user = userContext?.user;

  return (
    <CollectionProvider key={user?.id ?? 'guest'}>
      <FeeGuideProvider>
        {children}
      </FeeGuideProvider>
    </CollectionProvider>
  );
}
