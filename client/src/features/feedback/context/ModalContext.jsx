import { useState, createContext, useMemo, useContext } from 'react';
import { isValidString, logException } from '../../../utils/helpers';
import Feedback from '../../../config/feedback';

const { Errors } = Feedback;

export const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modalPayload, setModalPayload] = useState(null);

  const openModal = ({
    uiText = null,
    confirmLabel = 'OK',
    closeLabel = 'Cancel',
    handleConfirm = () => {},
    withClose = () => {},
    ...rest
  }) => {
    if (!isValidString(uiText))
      return logException(Errors.INVALID.DATA('string', typeof uiText), null);

    setModalPayload({
      uiText,
      confirmLabel,
      closeLabel,
      handleConfirm,
      withClose,
      ...rest,
    });
  };

  const resetModal = () => setModalPayload(null);

  const value = useMemo(
    () => ({ modalPayload, openModal, resetModal }),
    [modalPayload],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
