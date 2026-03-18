import { useNavigate } from 'react-router-dom';
import { Headings } from '../../../../../config/constants';
import PATHS from '../../../../../config/paths';
import Button from '../../../../../components/ui/Button';

import PageContent from './PageContent';
import PageFrame from '../../../../../components/ui/frames/PageFrame';
import Toolbar from './Toolbar';

export default function GridView() {
  const navigate = useNavigate();

  const contentProps = {
    heading: Headings.DASHBOARD_HEAD,
    uiText: Headings.DASHBOARD_SUBHEAD,
  };

  const ConvertButton = (
    <Button
      className='button--refine'
      label='Convert File'
      onClick={() => navigate(PATHS.FRONT.REFINERY)}
    />
  );

  return (
    <PageFrame
      toolbar={<Toolbar toolbarControls={ConvertButton} />}
      pageContent={<PageContent {...contentProps} />}
    />
  );
}
