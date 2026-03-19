import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Toolbar from './Toolbar';
import GuideToolbarControls from '../../components/GuideToolbarControls';
import PageContent from './PageContent';
import useFeeGuide from '../../context/useFeeGuide';

function GuideViewLayout() {
  const { id } = useParams();
  const { guide, isPending: isLoading, getFeeGuide } = useFeeGuide();
  const [searchCode, setSearchCode] = useState(null);

  useEffect(() => {
    if (id && guide?.id !== parseInt(id, 10)) {
      getFeeGuide(id);
    }
  }, [guide, id, getFeeGuide]);

  const toolbarControls = (
    <GuideToolbarControls
      searchCode={searchCode}
      setSearchCode={setSearchCode}
    />
  );

  return (
    <PageFrame
      toolbar={<Toolbar toolbarControls={toolbarControls} />}
      pageContent={
        <PageContent guide={guide} isLoading={isLoading} search={searchCode} />
      }
    />
  );
}

export default GuideViewLayout;
