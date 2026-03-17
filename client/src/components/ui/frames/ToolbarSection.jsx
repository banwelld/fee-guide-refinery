import SectionFrame from './SectionFrame';
import './ToolbarSection.css';

/**
 * @typedef ToolbarProps
 * @property {string} [heading]
 * @property {number} [headingLevel]
 * @property {string} [subHeading]
 * @property {boolean} [isRoot]
 * @property {string} [bemBlock]
 * @property {string} [bemMod]
 * @property {React.ReactNode} children
 */

/** @param {ToolbarProps} props */

export default function ToolbarSection({ children, isRoot, ...rest }) {
  const { heading = 'Options', hasPageHeading, subHeading: uiText } = rest;

  const sectionProps = { heading, hasPageHeading, uiText };

  return <SectionFrame {...sectionProps}>{children}</SectionFrame>;
}
