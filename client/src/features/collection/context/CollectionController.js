import {
  getData,
  postData,
  patchData,
  deleteData,
  runExclusive,
  logException,
} from '../../../utils/helpers';
import Feedback from '../../../config/feedback';
import { toClient, toServer } from '../utils/feeGuideSerializer';
import PATHS from '../../../config/paths';

const { Errors } = Feedback;

export function createCollectionController({
  setFeeGuides,
  concurrencyControls,
}) {
  const getFeeGuides = () =>
    runExclusive({
      doFetch: () =>
        getData(PATHS.BACK.GUIDES)
          .then((data) => {
            const guides = data.map(toClient);
            setFeeGuides(guides);
            return guides;
          })
          .catch((err) => {
            logException(Errors.FAILURE.RECEIVE, err);
            throw err;
          }),
      ...concurrencyControls,
    });

  const createFeeGuide = (data) => {
    const payload = toServer(data);

    return runExclusive({
      doFetch: () =>
        postData(PATHS.BACK.GUIDES, payload)
          .then((serverData) => {
            const newGuide = toClient(serverData);
            setFeeGuides((prev) => [...prev, newGuide]);
            return newGuide;
          })
          .catch((err) => {
            logException(Errors.FAILURE.CREATE, err);
            throw err;
          }),
      ...concurrencyControls,
    });
  };

  const updateFeeGuide = (data, id) => {
    const payload = toServer(data);

    return runExclusive({
      doFetch: () =>
        patchData(PATHS.BACK.GUIDE_ID(id), payload)
          .then((serverData) => {
            const updatedGuide = toClient(serverData);
            setFeeGuides((prev) =>
              prev.map((g) => (g.id === id ? updatedGuide : g)),
            );
            return updatedGuide;
          })
          .catch((err) => {
            logException(Errors.FAILURE.UPDATE, err);
            throw err;
          }),
      ...concurrencyControls,
    });
  };

  const deleteFeeGuide = (id) => {
    return runExclusive({
      doFetch: () =>
        deleteData(PATHS.BACK.GUIDE_ID(id))
          .then(() => {
            setFeeGuides((prev) => prev.filter((g) => g.id !== id));
            return true;
          })
          .catch((err) => {
            logException(Errors.FAILURE.DELETE, err);
            throw err;
          }),
      ...concurrencyControls,
    });
  };

  return {
    getFeeGuides,
    createFeeGuide,
    updateFeeGuide,
    deleteFeeGuide,
  };
}
