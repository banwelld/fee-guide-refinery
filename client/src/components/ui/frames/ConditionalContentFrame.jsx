import ContentSection from './ContentSection';

/**
 * @typedef SectionProps
 * @property {string} [heading] - the section's heading
 * @property {boolean} [isRoot] - the section is/is not the root section for its content/sidebar
 * @property {boolean} [hasPageHeading] - the section's heading shall be/not be H1
 * @property {string | string[]} [uiText] - messaging in content sections, subtitle in sidebar sections
 * @property {string} [bemBlock] - Block portion of BEM classname
 * @property {string} [bemMod] - Modifier portion of BEM classname
 * @property {string} [bemMod2] - conditional modifier of BEM classname
 * @property {boolean} [showMod2] - show bemMod2 when true
 * @property {React.ReactNode} children
 */

/** @param {SectionProps} props */
export default function ConditionalContentFrame({
  primaryView,
  secondaryView,
  isPrimary,
  ...sectionProps
}) {
  return (
    <ContentSection {...sectionProps}>
      {isPrimary ? primaryView : secondaryView}
    </ContentSection>
  );
}
