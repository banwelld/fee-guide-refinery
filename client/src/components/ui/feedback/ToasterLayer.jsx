import { Toaster } from 'react-hot-toast';

export default function ToasterLayer() {
  return (
    <Toaster
      position='bottom-right'
      toastOptions={{
        className: 'toaster__options',
        duration: 3000,
        removeDelay: 1000,
        success: { duration: 2000 },
      }}
    />
  );
}
