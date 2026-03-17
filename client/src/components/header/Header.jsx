import Nav from './Nav';
import Banner from './Banner';

export default function Header() {
  return (
    <div className='component__container, component__container--header'>
      <Banner />
      <Nav />
    </div>
  );
}
