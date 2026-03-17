import { Outlet } from 'react-router-dom';

import { UserProvider } from '../features/user/context/UserContext';
import { CollectionProvider } from '../features/collection/context/CollectionContext';
import { ModalProvider } from '../features/feedback/context/ModalContext';
import useUser from '../features/user/context/useUser';

export default function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <AppProviders>
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
      {children}
    </CollectionProvider>
  );
}
