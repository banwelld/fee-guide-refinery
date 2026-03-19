import { useState } from 'react';
import useCollection from '../../collection/context/useCollection';
import useFeeGuide from '../../collection/context/useFeeGuide';
import PageContent from './PageContent';
import PageFrame from '../../../components/ui/frames/PageFrame';
import toast from 'react-hot-toast';
import ToolbarControls from '../components/ToolbarControls';
import Toolbar from './Toolbar';

export default function ExportView() {
  const { feeGuides } = useCollection();
  const { guide, isPending, getFeeGuide } = useFeeGuide();

  const [guideId, setGuideId] = useState(null);
  const [format, setFormat] = useState('json');

  const handleExport = async () => {
    if (!guideId) return;

    // Ensure the selected guide is fully loaded into context
    let sourceGuide = guide;
    if (!guide || guide.id !== guideId) {
      toast.loading('Fetching guide details...', { id: 'fetch-export' });
      try {
        sourceGuide = await getFeeGuide(guideId);
        toast.dismiss('fetch-export');
      } catch (err) {
        toast.dismiss('fetch-export');
        toast.error('Failed to load guide data for export.');
        return;
      }
    }

    if (!sourceGuide?.feeGuideItems?.length) {
      toast.error('This guide has no items to export!');
      return;
    }

    const rawData = sourceGuide.feeGuideItems.map((item) => ({
      code: item.scheduleItem?.code || 'N/A',
      fee_cents_min: item.feeMinCents,
      fee_cents_max: item.feeMaxCents,
      has_L_flag: item.hasLFlag,
      has_E_flag: item.hasEFlag,
    }));

    let blob;
    let ext = format;

    if (format === 'json') {
      blob = new Blob([JSON.stringify(rawData, null, 2)], {
        type: 'application/json',
      });
    } else {
      const delimiter = format === 'tsv' ? '\t' : ',';
      const headers = [
        'code',
        'fee_cents_min',
        'fee_cents_max',
        'has_L_flag',
        'has_E_flag',
      ];
      const rows = rawData.map((row) =>
        headers.map((h) => row[h]).join(delimiter),
      );
      const outputStr = [headers.join(delimiter), ...rows].join('\n');
      blob = new Blob([outputStr], {
        type: format === 'tsv' ? 'text/tab-separated-values' : 'text/csv',
      });
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fee_guide_${sourceGuide.provinceCode}_${sourceGuide.specialtyCode}_${sourceGuide.yearEffective}.${ext.toLowerCase()}`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${format.toUpperCase()} successfully!`);
  };

  const toolbarControls = (
    <ToolbarControls
      guideId={guideId}
      setGuideId={setGuideId}
      format={format}
      setFormat={setFormat}
      onExport={handleExport}
      isLoading={isPending && guide?.id !== guideId}
      feeGuides={feeGuides}
    />
  );

  return (
    <PageFrame
      toolbar={<Toolbar toolbarControls={toolbarControls} />}
      pageContent={<PageContent />}
    />
  );
}
