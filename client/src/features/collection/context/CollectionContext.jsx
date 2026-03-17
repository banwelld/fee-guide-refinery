import { createContext, useState, useEffect, useRef, useMemo } from 'react';
import toast from 'react-hot-toast';
import Feedback from '../../../config/feedback';
import { createCollectionController } from './CollectionController';

const { Toasts } = Feedback;

export const CollectionContext = createContext(null);

export function CollectionProvider({ children }) {
  const [feeGuides, setFeeGuides] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);

  const { getFeeGuides, createFeeGuide, updateFeeGuide, deleteFeeGuide } =
    useMemo(() => {
      const concurrencyControls = {
        lockRef: isBusyRef,
        setPending: setIsPending,
      };

      return createCollectionController({
        setFeeGuides,
        concurrencyControls,
      });
    }, []);

  // fetch fee guides on mount
  useEffect(() => {
    getFeeGuides().catch(() => {
      toast.error(Toasts.COLLECTION.LOAD.FAILURE);
    });
  }, [getFeeGuides]);

  const ctx = useMemo(
    () => ({
      feeGuides,
      createFeeGuide,
      updateFeeGuide,
      deleteFeeGuide,
      isPending,
      findFeeGuide: (id) => feeGuides.find((g) => g.id === id),
    }),
    [feeGuides, isPending, createFeeGuide, updateFeeGuide, deleteFeeGuide],
  );

  return (
    <CollectionContext.Provider value={ctx}>
      {children}
    </CollectionContext.Provider>
  );
}
