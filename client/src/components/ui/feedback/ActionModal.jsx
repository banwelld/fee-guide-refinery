import { useEffect, useRef } from 'react';
import Button from '../Button';
import { toBemClassName } from '../../../utils/helpers';
import './ActionModal.css';

export default function ActionModal({
  children,
  isOpen,
  uiText = '',
  hasConfirmButton = true,
  hasCloseButton = true,
  confirmLabel = 'OK',
  closeLabel = 'Cancel',
  onConfirm = () => {},
  onClose = () => {},
  bemBlock = 'action-modal',
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    let timeoutId;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      timeoutId = setTimeout(() => dialog.close(), 300);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen, bemBlock]);

  const onClickOffModal = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={onClickOffModal}
      className={toBemClassName({
        bemBlock,
        bemMod2: 'active',
        showMod2: isOpen,
      })}
    >
      <div
        className={toBemClassName({
          bemBlock,
          bemElem: 'container',
          bemMod: 'contents',
        })}
      >
        <div
          className={toBemClassName({
            bemBlock,
            bemElem: 'container',
            bemMod: 'ui-text',
          })}
        >
          {uiText}
        </div>
        {children && (
          <div
            className={toBemClassName({
              bemBlock,
              bemElem: 'container',
              bemMod: 'children',
            })}
          >
            {children}
          </div>
        )}
        <div
          className={toBemClassName({
            bemBlock,
            bemElem: 'container',
            bemMod: 'button',
          })}
        >
          {hasConfirmButton && (
            <Button
              label={confirmLabel}
              onClick={onConfirm}
              bemMod='modal-confirm'
            />
          )}
          {hasCloseButton && (
            <Button
              label={closeLabel}
              onClick={onClose}
              bemMod='modal-cancel'
            />
          )}
        </div>
      </div>
    </dialog>
  );
}
