import { useNavigate, useParams } from 'react-router-dom';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Button from '../../../../components/ui/Button';
import Toolbar from './Toolbar';
import PageContent from './PageContent';
import PATHS from '../../../../config/paths';
import { FeeGuideProvider } from './context/FeeGuideContext';
import useFeeGuide from './context/useFeeGuide';

function GuideViewLayout() {
  const navigate = useNavigate();
  const { guide, isPending: isLoading } = useFeeGuide();

  const toolbarControls = (
    <Button
      onClick={() => navigate(PATHS.FRONT.DASHBOARD)}
      className='button--secondary button--full-width'>
      Back to Dashboard
    </Button>
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
