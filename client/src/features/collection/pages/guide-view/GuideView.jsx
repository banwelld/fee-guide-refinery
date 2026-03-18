import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ActionModal from '../../../feedback/ActionModal';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Button from '../../../../components/ui/Button';
import Toolbar from './Toolbar';
import PageContent from './PageContent';
import PATHS from '../../../../config/paths';
import { FeeGuideProvider } from '../../context/FeeGuideContext';
import useFeeGuide from '../../context/useFeeGuide';
import useUser from '../../../user/context/useUser';
import { UserRole } from '../../../../config/constants';

function GuideViewLayout() {
  const navigate = useNavigate();
  const { guide, isPending: isLoading, deleteFeeGuide } = useFeeGuide();
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isManager = user?.role === UserRole.MANAGER || user?.role === UserRole.ADMIN;

  const confirmDelete = () => {
    deleteFeeGuide(guide.id)
      .then(() => {
        setIsModalOpen(false);
        toast.success('Fee guide deleted successfully.');
        navigate(PATHS.FRONT.DASHBOARD, { replace: true });
      })
      .catch(() => {
        setIsModalOpen(false);
        toast.error('Failed to delete fee guide.');
      });
  };

  const toolbarControls = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {isManager && !isLoading && guide && (
        <>
          <Button
            onClick={() => setIsModalOpen(true)}
            className='button--danger button--full-width'
            label='Delete Guide'
          />
          <ActionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={confirmDelete}
            uiText='Are you absolutely sure you want to delete this fee guide?'
            confirmLabel='Delete'
          />
        </>
      )}
      <Button
        onClick={() => navigate(PATHS.FRONT.DASHBOARD)}
        className='button--secondary button--full-width'
        label='Back to Dashboard'
      />
    </div>
  );

  return (
    <PageFrame
      toolbar={<Toolbar toolbarControls={toolbarControls} />}
      pageContent={<PageContent guide={guide} isLoading={isLoading} />}
    />
  );
}

export default function GuideView() {
  const { id } = useParams();

  return (
    <FeeGuideProvider id={id}>
      <GuideViewLayout />
    </FeeGuideProvider>
  );
}
