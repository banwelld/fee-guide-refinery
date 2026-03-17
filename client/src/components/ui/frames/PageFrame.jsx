import { toBemClassName } from '../../../utils/helpers';
import '../css/buttons.css';
import '../../../css/form.css';

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
 * @param {string} props.pageName - The page name
 */
export default function PageFrame({ toolbar, pageContent, pageName }) {
  return (
    <main className={toBemClassName({ bemBlock: 'page', bemMod: pageName })}>
      <aside
        className={toBemClassName({ bemBlock: 'toolbar', bemMod: pageName })}>
        {toolbar}
      </aside>
      <div
        className={toBemClassName({ bemBlock: 'content', bemMod: pageName })}>
        {pageContent}
      </div>
    </main>
  );
}
