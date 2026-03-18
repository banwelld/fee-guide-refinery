import FeeGuideCard from './FeeGuideCard';
import useCollection from '../context/useCollection';

import { Headings } from '../../../config/constants';

export default function FeeGuideList() {
  const { feeGuides, isPending } = useCollection();

  if (isPending) {
    return <div className='loading-state'>Loading your collection...</div>;
  }

  if (!feeGuides || feeGuides.length === 0) {
    return (
      <div className='fg-list__container fg-list__container--empty-state'>
        <p>{Headings.NO_FEE_GUIDES}</p>
        {/* We can add an 'Add Guide' button here later */}
      </div>
    );
  }

  return (
    <div className='fg-list__container'>
      {feeGuides.map((guide) => (
        <FeeGuideCard key={guide.id} feeGuide={guide} />
      ))}
    </div>
  );
}
