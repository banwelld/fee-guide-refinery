import {
  getData,
  patchData,
  deleteData,
  runExclusive,
  logException,
} from '../../../utils/helpers';
import Feedback from '../../../config/feedback';
import PATHS from '../../../config/paths';

const { Errors } = Feedback;

export function createFeeGuideController({ setGuide, concurrencyControls }) {
  const getFeeGuide = (id) =>
    runExclusive({
      doFetch: () =>
        getData(PATHS.BACK.GUIDE_ID(id))
          .then((data) => {
            setGuide(data);
            return data;
          })
          .catch((err) => {
            logException(Errors.FAILURE.RECEIVE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  const patchFeeGuide = (id, payload) =>
    runExclusive({
      doFetch: () =>
        patchData(PATHS.BACK.GUIDE_ID(id), payload)
          .then((data) => {
            setGuide(data);
            return data;
          })
          .catch((err) => {
            logException(Errors.FAILURE.UPDATE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  const deleteFeeGuide = (id) =>
    runExclusive({
      doFetch: () =>
        deleteData(PATHS.BACK.GUIDE_ID(id))
          .then(() => {
            setGuide(null);
            return true;
          })
          .catch((err) => {
            logException(Errors.FAILURE.DELETE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  const patchFeeGuideItem = (guideId, itemId, payload) =>
    runExclusive({
      doFetch: () =>
        patchData(PATHS.BACK.GUIDE_ITEM_ID(itemId), payload)
          .then((data) => {
            setGuide((prev) => {
              if (!prev || prev.id !== guideId) return prev;
              const items = prev.fee_guide_items.map((i) =>
                i.id === itemId ? data : i
              );
              return { ...prev, fee_guide_items: items };
            });
            return data;
          })
          .catch((err) => {
            logException(Errors.FAILURE.UPDATE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  const deleteFeeGuideItem = (guideId, itemId) =>
    runExclusive({
      doFetch: () =>
        deleteData(PATHS.BACK.GUIDE_ITEM_ID(itemId))
          .then(() => {
            setGuide((prev) => {
              if (!prev || prev.id !== guideId) return prev;
              const items = prev.fee_guide_items.filter((i) => i.id !== itemId);
              return { ...prev, fee_guide_items: items };
            });
            return true;
          })
          .catch((err) => {
            logException(Errors.FAILURE.DELETE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  return { getFeeGuide, patchFeeGuide, deleteFeeGuide, patchFeeGuideItem, deleteFeeGuideItem };
}
