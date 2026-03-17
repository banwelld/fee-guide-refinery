import { Headings } from '../../../../../config/constants';
import PageContent from './PageContent';
import PageFrame from '../../../../../components/ui/frames/PageFrame';
import Toolbar from './Toolbar';

export default function GridView() {
  const toolbarConfig = {
    // Placeholder config for now, can be expanded for filtering/sorting later
    filter: { sectionProps: { heading: 'Filter' }, listProps: { items: [] } },
    sort: { sectionProps: { heading: 'Sort' }, listProps: { items: [] } },
  };

  const toolbarControls = {
    config: toolbarConfig,
    heading: Headings.DASHBOARD_HEAD,
    subHeading: Headings.DASHBOARD_SUBHEAD,
  };

  return (
    <PageFrame
      toolbar={<Toolbar {...toolbarControls} />}
      pageContent={<PageContent pageName='dashboard' />}
    />
  );
}
