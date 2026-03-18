import ToolbarSection from '../../../../components/ui/frames/ToolbarSection';
import ItemEditorForm from '../../components/ItemEditorForm';

export default function Toolbar({ toolbarControls }) {
  return (
    <ToolbarSection heading='Actions'>
      {toolbarControls}
      <ItemEditorForm />
    </ToolbarSection>
  );
}
