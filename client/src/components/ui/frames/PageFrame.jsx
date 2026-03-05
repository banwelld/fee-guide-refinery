import { toBemClassName } from '../../../utils/helpers';
import '../css/buttons.css';
import '../../../css/form.css';

/**
 * **PageFrame component**
 *
 * A layout container for a page's sidebar and main content
 *
 * Uses the **slot pattern** with named slots for sidebar and main content
 *
 * @param {Object} props
 * @param {ReactNode} props.sidebar - The sidebar content
 * @param {ReactNode} props.PageContent - The main content
 * @param {string} props.pageName - The page name
 */
export default function PageFrame({ sidebar, pageContent, pageName }) {
  return (
    <main className={toBemClassName({ bemBlock: 'page', bemMod: pageName })}>
      <aside
        className={toBemClassName({ bemBlock: 'sidebar', bemMod: pageName })}
      >
        {sidebar}
      </aside>
      <div
        className={toBemClassName({ bemBlock: 'content', bemMod: pageName })}
      >
        {pageContent}
      </div>
    </main>
  );
}
