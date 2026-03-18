import { Headings } from '../../../../../config/constants';
import PageContent from './PageContent';
import PageFrame from '../../../../../components/ui/frames/PageFrame';
import Toolbar from './Toolbar';

export default function GridView() {
  const contentProps = {
    heading: Headings.DASHBOARD_HEAD,
    uiText: Headings.DASHBOARD_SUBHEAD,
  };

  return (
    <PageFrame
      toolbar={<Toolbar />}
      pageContent={<PageContent {...contentProps} />}
    />
  );
}
