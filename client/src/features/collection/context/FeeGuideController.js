import {
  getData,
  patchData,
  deleteData,
  runExclusive,
  logException,
} from '../../../utils/helpers';
import Feedback from '../../../config/feedback';
import PATHS from '../../../config/paths';
import { toClient as guideToClient, toServer as guideToServer } from '../utils/feeGuideSerializer';
import { toClient as itemToClient, toServer as itemToServer } from '../utils/feeGuideItemSerializer';

const { Errors } = Feedback;

export function createFeeGuideController({ setGuide, concurrencyControls }) {
  const getFeeGuide = (id) =>
    runExclusive({
      doFetch: () =>
        getData(PATHS.BACK.GUIDE_ID(id))
          .then((data) => {
            const guide = guideToClient(data);
            setGuide(guide);
            return guide;
          })
          .catch((err) => {
            logException(Errors.FAILURE.RECEIVE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  const patchFeeGuide = (id, clientData) => {
    const payload = guideToServer(clientData);
    return runExclusive({
      doFetch: () =>
        patchData(PATHS.BACK.GUIDE_ID(id), payload)
          .then((data) => {
            const guide = guideToClient(data);
            setGuide(guide);
            return guide;
          })
          .catch((err) => {
            logException(Errors.FAILURE.UPDATE, err);
            throw err;
          }),
      ...concurrencyControls,
    });
  };

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

  const patchFeeGuideItem = (guideId, itemId, clientData) => {
    const payload = itemToServer(clientData);
    return runExclusive({
      doFetch: () =>
        patchData(PATHS.BACK.GUIDE_ITEM_ID(itemId), payload)
          .then((data) => {
            const updatedItem = itemToClient(data);
            setGuide((prev) => {
              if (!prev || prev.id !== guideId) return prev;
              const items = prev.feeGuideItems.map((i) =>
                i.id === itemId ? updatedItem : i
              );
              return { ...prev, feeGuideItems: items };
            });
            return updatedItem;
          })
          .catch((err) => {
            logException(Errors.FAILURE.UPDATE, err);
            throw err;
          }),
      ...concurrencyControls,
    });
  };

  const deleteFeeGuideItem = (guideId, itemId) =>
    runExclusive({
      doFetch: () =>
        deleteData(PATHS.BACK.GUIDE_ITEM_ID(itemId))
          .then(() => {
            setGuide((prev) => {
              if (!prev || prev.id !== guideId) return prev;
              const items = prev.feeGuideItems.filter((i) => i.id !== itemId);
              return { ...prev, feeGuideItems: items };
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
