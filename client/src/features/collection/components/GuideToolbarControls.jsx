import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ActionModal from '../../feedback/ActionModal';
import Button from '../../../components/ui/Button';
import FeeGuideItemForm from './FeeGuideItemForm';
import PATHS from '../../../config/paths';
import useFeeGuide from '../context/useFeeGuide';
import useCollection from '../context/useCollection';
import useUser from '../../user/context/useUser';
import { UserRole } from '../../../config/constants';

export default function GuideToolbarControls({ searchCode, setSearchCode }) {
  const navigate = useNavigate();
  const {
    guide,
    isPending: isLoading,
    deleteFeeGuide,
    patchFeeGuideItem,
  } = useFeeGuide();
  const { getFeeGuides } = useCollection();
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedItem =
    searchCode
    && guide?.feeGuideItems?.find(
      (item) =>
        item.scheduleItem.code === searchCode
        && item.scheduleItem.code[4] !== '0',
    );

  const isManager =
    user?.role === UserRole.MANAGER || user?.role === UserRole.ADMIN;

  const confirmDelete = () => {
    deleteFeeGuide(guide.id)
      .then(() => {
        getFeeGuides();
        setIsModalOpen(false);
        toast.success('Fee guide deleted successfully.');
        navigate(PATHS.FRONT.DASHBOARD, { replace: true });
      })
      .catch(() => {
        setIsModalOpen(false);
        toast.error('Failed to delete fee guide.');
      });
  };

  const handleSave = (values) => {
    const payload = {
      feeMinCents: values.feeMinCents
        ? Math.round(parseFloat(values.feeMinCents) * 100)
        : 0,
      feeMaxCents: values.feeMaxCents
        ? Math.round(parseFloat(values.feeMaxCents) * 100)
        : 0,
      hasLFlag: values.hasLFlag,
      hasEFlag: values.hasEFlag,
    };

    patchFeeGuideItem(guide.id, selectedItem.id, payload)
      .then(() => {
        toast.success(
          `Procedure ${selectedItem.scheduleItem.code} updated successfully.`,
        );
      })
      .catch(() => {
        toast.error('Failed to update procedure pricing.');
      });
  };

  return (
    <>
      {isManager && !isLoading && guide && (
        <>
          <Button
            onClick={() => setIsModalOpen(true)}
            className='button--danger button--danger'
            label='Delete Guide'
          />
          <ActionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={confirmDelete}
            uiText='Are you certain that you want to delete this fee guide?'
            confirmLabel='Delete'
          />
        </>
      )}
      <div className='item-filter__container'>
        <h2 className='item-filter__heading'>Filter by Code</h2>
        <form className='form form--item-filter'>
          <input
            list='fee-guide-items-list'
            type='text'
            value={searchCode || ''}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder='Code (e.g. 01101)'
            className='field__input'
            autoComplete='off'
          />
          <datalist id='fee-guide-items-list'>
            {guide?.feeGuideItems?.map((item) => (
              <option key={item.id} value={item.scheduleItem.code}>
                {item.scheduleItem.code} - {item.scheduleItem.name}
              </option>
            ))}
          </datalist>
        </form>
      </div>
      {isManager && selectedItem && (
        <FeeGuideItemForm item={selectedItem} onSubmit={handleSave} />
      )}
    </>
  );
}
