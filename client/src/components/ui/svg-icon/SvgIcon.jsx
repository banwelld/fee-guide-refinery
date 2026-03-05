export default function Icon({ path }) {
  const svgProps = {
    fill: 'currentColor',
    viewBox: '0 -960 960 960',
    xmlns: 'http://www.w3.org/2000/svg',
  };
  return (
    <svg {...svgProps}>
      <path d={path} fillRule='evenodd' clipRule='evenodd' />
    </svg>
  );
}
