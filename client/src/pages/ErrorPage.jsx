import { useRouteError } from 'react-router-dom';
import Header from '../features/header/Header';
import SectionFrame from '../components/ui/frames/SectionFrame';
import { Headings, UiText } from '../config/constants';

export default function ErrorPage({
  heading = Headings.WHOOPS,
  uiText = UiText.GENERAL_ERROR,
}) {
  const error = useRouteError();
  const isRouteError = !!error;

  const displayHeading = error?.statusText || heading;
  const displayText = error?.message || uiText;

  const content = (
    <SectionFrame heading={displayHeading} uiText={displayText} />
  );

  if (isRouteError)
    return (
      <div className='site-wrapper'>
        <Header />
        {content}
      </div>
    );

  return content;
}
