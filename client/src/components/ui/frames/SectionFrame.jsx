import './ContentSection.css';

export default function SectionFrame({
  heading = 'HEADING_MISSING_OR_INVALID',
  uiText = null,
  isBase = false,
  children,
  id,
}) {
  const headingLevel = isBase ? 1 : 2;
  const Heading = `h${headingLevel}`;
  const className = isBase ? 'content__section base' : 'content__section';

  const arrayToMappedText = (text, index) => <p key={index}>{text}</p>;

  return (
    <section id={id} className={className}>
      <div className='content__container--header'>
        <header>
          <Heading>{heading}</Heading>
        </header>
        {!!uiText && (
          <div className='content__container--ui-text'>
            {Array.isArray(uiText) ? uiText.map(arrayToMappedText) : uiText}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
