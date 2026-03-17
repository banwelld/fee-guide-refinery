import { Headings } from '../../../../../config/constants';
import OptionSelect from '../components/OptionSelect';
import ToolbarSection from '../../../../../components/ui/frames/ToolbarSection';

export default function Toolbar({ config, pageName, heading, subHeading }) {
  const { filter, sort } = config;
  return (
    <ToolbarSection
      isRoot
      hasPageHeading
      heading={heading || Headings.FG_REFINERY}
      subHeading={subHeading}>
      <ToolbarSection {...filter.sectionProps}>
        <OptionSelect {...filter.listProps} />
      </ToolbarSection>
      <ToolbarSection {...sort.sectionProps}>
        <OptionSelect {...sort.listProps} />
      </ToolbarSection>
    </ToolbarSection>
  );
}
