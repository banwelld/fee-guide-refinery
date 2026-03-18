import { createContext, useState, useEffect, useRef, useMemo } from 'react';
import toast from 'react-hot-toast';
import { createFeeGuideController } from './FeeGuideController';

export const FeeGuideContext = createContext(null);

export function FeeGuideProvider({ id, children }) {
  const [guide, setGuide] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const isBusyRef = useRef(false);

  const {
    getFeeGuide,
    patchFeeGuide,
    deleteFeeGuide,
    patchFeeGuideItem,
    deleteFeeGuideItem,
  } = useMemo(() => {
    const concurrencyControls = {
      lockRef: isBusyRef,
      setPending: setIsPending,
    };

    return createFeeGuideController({
      setGuide,
      concurrencyControls,
    });
  }, []);

  useEffect(() => {
    if (id) {
      getFeeGuide(id).catch(() => {
        toast.error('Failed to load fee guide details.');
      });
    }
  }, [id, getFeeGuide]);

  const ctx = useMemo(
    () => ({
      guide,
      isPending,
      getFeeGuide,
      patchFeeGuide,
      deleteFeeGuide,
      patchFeeGuideItem,
      deleteFeeGuideItem,
    }),
    [
      guide,
      isPending,
      getFeeGuide,
      patchFeeGuide,
      deleteFeeGuide,
      patchFeeGuideItem,
      deleteFeeGuideItem,
    ]
  );

  return (
    <FeeGuideContext.Provider value={ctx}>
      {children}
    </FeeGuideContext.Provider>
  );
}
