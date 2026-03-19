export default function PageContent() {
  return (
    <div className='content__section base'>
      <h1>Data Exporter</h1>
      <h2>Generate downloadable datasets strictly from browser memory</h2>
      <p className='content__ui-text content__ui-text--export'>
        Select a fee guide from the toolbar, choose your desired file format,
        and download the data instantly! Since this handles the file generation
        locally in your browser leveraging your active application context,
        downloads are completely instantaneous with zero server round-trips!
      </p>
      <h2>COMING SOON!</h2>
      <p>
        In the near future, you'll be able to customize your exports for custom
        field order, custom heading names, etc.
      </p>
    </div>
  );
}
