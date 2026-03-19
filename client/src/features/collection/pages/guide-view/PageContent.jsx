import SectionFrame from "../../../../components/ui/frames/SectionFrame";
import PROVINCES from "../../../refinery/config/provinces";
import SPECIALTIES from "../../../refinery/config/specialties";
import FeeGuideItemsTable from "../../components/FeeGuideItemsTable";

export default function PageContent({ guide, isLoading, search }) {
  if (isLoading) {
    return (
      <div className='loading-state'>
        <p>Loading fee guide data...</p>
      </div>
    );
  }

  if (!guide) {
    return (
      <SectionFrame
        className='content__section content__section--table'
        heading='Oops...'
        isBase={true}
      >
        <h2>Guide Not Found</h2>
      </SectionFrame>
    );
  }

  const provinceName = PROVINCES.find((p) => p.code === guide.provinceCode)?.name;

  const specialtyName = SPECIALTIES.find((s) => s.code === guide.specialtyCode)?.name;

  return (
    <SectionFrame
      className='content__section content__section--table'
      heading={`${guide.yearEffective} ${provinceName} - ${specialtyName}`}
      isBase={true}
    >
      <FeeGuideItemsTable items={guide.feeGuideItems} search={search} />
    </SectionFrame>
  );
}
