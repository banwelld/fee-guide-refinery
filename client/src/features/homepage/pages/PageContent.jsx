import ContentSection from '../../../../components/ui/frames/ContentSection';
import { Headings, UiText } from '../../../../config/constants';

export default function PageContent() {
  const sectionProps = {
    isRoot: true,
    hasPageHeading: false,
    heading: Headings.AUTH_MAIN,
    uiText: UiText.AUTH_MAIN,
  };

  return (
    <ContentSection {...sectionProps}>
      <ContentSection
        heading={Headings.AUTH_LOAD}
        uiText={UiText.AUTH_LOAD}></ContentSection>
      <ContentSection
        heading={Headings.AUTH_OUTPUT}
        uiText={UiText.AUTH_OUTPUT}></ContentSection>
      <ContentSection
        heading={Headings.AUTH_COMPLIANT}
        uiText={UiText.AUTH_COMPLIANT}></ContentSection>
      <ContentSection
        heading={Headings.AUTH_SECURE}
        uiText={UiText.AUTH_SECURE}></ContentSection>
    </ContentSection>
  );
}
