import { useModal } from '../../../hooks/useModal';
import ActionModal from './ActionModal';

export default function ModalLayer() {
  const { modalPayload, resetModal } = useModal();

  if (!modalPayload) return null;

  const confirm = () => {
    modalPayload.handleConfirm();
    resetModal();
  };

  const close = () => {
    modalPayload.withClose();
    resetModal();
  };

  return (
    <ActionModal
      isOpen={!!modalPayload}
      {...modalPayload}
      onConfirm={confirm}
      onClose={close}
    />
  );
}
