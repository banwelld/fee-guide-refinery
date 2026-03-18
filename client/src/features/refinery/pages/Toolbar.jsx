import ToolbarSection from '../../../components/ui/frames/ToolbarSection';

export default function Toolbar({ toolbarControls }) {
  return (
    <section className='sidebar__container'>
      <header>
        <h2>Members</h2>
      </header>
      {toolbarControls}
    </section>
  );
}
