import { createContext, useState, useEffect, useRef, useMemo } from 'react';
import toast from 'react-hot-toast';
import { createFeeGuideController } from './FeeGuideController';

export const FeeGuideContext = createContext(null);

export function FeeGuideProvider({ children }) {
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
