import SectionFrame from './SectionFrame';
import './ContentSection.css';

/**
 * @typedef ContentProps
 * @property {string} [heading] - the section's heading
 * @property {boolean} [isRoot] - the section is/is not the root section for its content/sidebar
 * @property {boolean} [hasPageHeading] - the section's heading shall be/not be H1
 * @property {string | string[]} [uiText] - messaging in content sections, subtitle in sidebar sections
 * @property {string} [bemBlock] - Block portion of BEM classname
 * @property {string} [bemMod] - Modifier portion of BEM classname
 * @property {string} [bemMod2] - conditional modifier of BEM classname
 * @property {boolean} [showBemMod2] - show bemMod2 when true
 * @property {React.ReactNode} children
 */

/** @param {ContentProps} props */

export default function ContentSection({ children, isRoot, ...allProps }) {
  const {
    bemBlock = 'content',
    bemMod,
    bemMod2 = isRoot ? 'root' : undefined,
    showMod2 = isRoot ? true : undefined,
    ...rest
  } = allProps;

  const bemRoot = { bemBlock, bemMod, bemMod2, showMod2 };
  const sectionProps = { ...rest, bemRoot };

  return <SectionFrame {...sectionProps}>{children}</SectionFrame>;
}
