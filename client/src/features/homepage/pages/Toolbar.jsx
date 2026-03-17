import ToolbarSection from '../../../../components/ui/frames/ToolbarSection';

export default function Toolbar({ toolbarontrols }) {
  return (
    <ToolbarSection isRoot bemMod='auth'>
      {toolbarontrols}
    </ToolbarSection>
  );
}
