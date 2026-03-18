import SectionFrame from '../../../../../components/ui/frames/SectionFrame';
import FeeGuideList from '../../../components/FeeGuideList';

export default function PageContent({ heading, uiText }) {
  const sectionProps = {
    className: 'grid-view__container, grid-view__container--fg-cards',
    heading,
    uiText,
    isBase: true,
  };
  return (
    <SectionFrame {...sectionProps}>
      <FeeGuideList />
    </SectionFrame>
  );
}
