/**
 * **PageFrame component**
 *
 * A layout container for a page's toolbar and main content
 *
 * Uses the **slot pattern** with named slots for toolbar and main content
 *
 * @param {Object} props
 * @param {ReactNode} props.toolbar - The toolbar content
 * @param {ReactNode} props.PageContent - The main content
 */
export default function PageFrame({ toolbar, pageContent }) {
  return (
    <main>
      <aside className='toolbar'>{toolbar}</aside>
      <div className='content'>{pageContent}</div>
    </main>
  );
}
