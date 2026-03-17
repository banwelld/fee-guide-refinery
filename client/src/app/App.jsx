import { Outlet } from 'react-router-dom';

import { ModalProvider } from '../contexts/ModalContext';
import { UserProvider } from '../features/user/context/UserContext';
import { CartProvider } from '../features/cart/context/CartContext';
import useUser from '../features/user/hooks/useUser';

export default function App() {
  return (
    <UserProvider>
      <AppProviders>
        <Outlet />
      </AppProviders>
    </UserProvider>
  );
}

function AppProviders({ children }) {
  const { user } = useUser();
  return (
    <CollectionProvider key={user?.id ?? 'guest'}>
      <CartProvider key={user?.id ?? 'guest'}>{children}</CartProvider>
    </CollectionProvider>
  );
}
