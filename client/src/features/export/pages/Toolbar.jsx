import ToolbarSection from '../../../components/ui/frames/ToolbarSection';

export default function Toolbar({ toolbarControls }) {
  return (
    <ToolbarSection heading='Export Options'>{toolbarControls}</ToolbarSection>
  );
}
