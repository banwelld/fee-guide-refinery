import SectionFrame from '../../../components/ui/frames/SectionFrame';
import { Headings, UiText } from '../../../config/constants';

export default function PageContent({ children }) {
  const sectionProps = {
    heading: Headings.REFINERY,
    uiText: UiText.REFINERY,
  };

  return <SectionFrame {...sectionProps}>{children}</SectionFrame>;
}
