import SectionFrame from '../../../components/ui/frames/SectionFrame';
import { Headings, UiText } from '../../../config/constants';
import publicViewImg1 from '../assets/public-view-image-01.webp';
import publicViewImg2 from '../assets/public-view-image-02.webp';
import publicViewImg3 from '../assets/public-view-image-03.webp';
export default function PageContent() {
  const sectionProps = {
    isBase: true,
    hasPageHeading: false,
    heading: Headings.AUTH_MAIN,
    uiText: UiText.AUTH_MAIN,
  };

  return (
    <SectionFrame {...sectionProps}>
      <div className='content__container--images'>
        <img
          className='content__image--public-view'
          src={publicViewImg1}
          alt='A frutrated employee'
        />
        <img
          className='content__image--public-view'
          src={publicViewImg2}
          alt='A frutrated employee'
        />
        <img
          className='content__image--public-view'
          src={publicViewImg3}
          alt='A frutrated employee'
        />
      </div>
      <SectionFrame heading={Headings.AUTH_LOAD} uiText={UiText.AUTH_LOAD} />
      <SectionFrame heading={Headings.AUTH_VALUE} uiText={UiText.AUTH_VALUE} />
      <SectionFrame
        heading={Headings.AUTH_OUTPUT}
        uiText={UiText.AUTH_OUTPUT}
      />
      <SectionFrame
        heading={Headings.AUTH_COMPLIANT}
        uiText={UiText.AUTH_COMPLIANT}
      />
      <SectionFrame
        heading={Headings.AUTH_SECURE}
        uiText={UiText.AUTH_SECURE}
      />
      <div className='footer-content'>
        <SectionFrame id='contact' heading={Headings.CONTACT_US}>
          <address className='footer-content__address'>
            <h3>ADDRESS</h3>
            <p>
              2557 Any Street
              <br />
              Windsor ON{'  '}N9N 9N9
            </p>
          </address>
          <div className='footer-content__phone'>
            <h3>TELEPHONE</h3>
            <p>
              <strong>Local:</strong> &emsp; 519.555.2999
            </p>
            <p>
              <strong>Toll-free:</strong> &emsp; 1-800-REFINERY-DATA-VOID
            </p>
          </div>
        </SectionFrame>
      </div>
    </SectionFrame>
  );
}
