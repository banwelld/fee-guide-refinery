import { toBemClassName } from '../../../utils/helpers';

export default function SectionFrame({
  heading = 'HEADING_MISSING_OR_INVALID',
  hasPageHeading = false,
  uiText = null,
  children,
  bemRoot,
}) {
  const headingLevel = hasPageHeading ? 1 : 2;
  const Heading = `h${headingLevel}`;

  const arrayToMappedText = (text, index) => <p key={index}>{text}</p>;

  return (
    <section className={toBemClassName({ bemElem: 'section', ...bemRoot })}>
      <div className={toBemClassName({ bemElem: 'intro', ...bemRoot })}>
        <header className={toBemClassName({ bemElem: 'header', ...bemRoot })}>
          <Heading>{heading}</Heading>
        </header>
        {!!uiText && (
          <div className={toBemClassName({ bemElem: 'ui-text', ...bemRoot })}>
            {Array.isArray(uiText) ? uiText.map(arrayToMappedText) : uiText}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
