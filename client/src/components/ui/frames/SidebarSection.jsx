import SectionFrame from './SectionFrame';
import './SidebarSection.css';

/**
 * @typedef SidebarProps
 * @property {string} [heading]
 * @property {number} [headingLevel]
 * @property {string} [subHeading]
 * @property {boolean} [isRoot]
 * @property {string} [bemBlock]
 * @property {string} [bemMod]
 * @property {React.ReactNode} children
 */

/** @param {SidebarProps} props */

export default function SidebarSection({ children, isRoot, ...rest }) {
  const {
    heading = 'Options',
    hasPageHeading,
    subHeading: uiText,
    bemBlock = 'sidebar',
    bemMod,
    bemMod2 = isRoot ? 'root' : undefined,
    showMod2 = isRoot ? true : undefined,
  } = rest;

  const bemRoot = { bemBlock, bemMod, bemMod2, showMod2 };
  const sectionProps = { heading, hasPageHeading, uiText, bemRoot };

  return <SectionFrame {...sectionProps}>{children}</SectionFrame>;
}
