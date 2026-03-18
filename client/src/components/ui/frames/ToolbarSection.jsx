import SectionFrame from './SectionFrame';
import './ToolbarSection.css';

export default function ToolbarSection({ children, isBase, ...rest }) {
  const { heading = 'Options', hasPageHeading, subHeading: uiText } = rest;

  const sectionProps = { heading, hasPageHeading, uiText };

  return <SectionFrame {...sectionProps}>{children}</SectionFrame>;
}
