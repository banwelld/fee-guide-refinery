import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { postData } from '../../../utils/helpers';

import PageContent from './PageContent';
import Toolbar from './Toolbar';
import FeeGuideForm from '../components/FeeGuideForm';
import PageFrame from '../../../components/ui/frames/PageFrame';

import Feedback from '../../../config/feedback';
import PATHS from '../../../config/paths';

const { Toasts } = Feedback;

export default function RefineView() {
  const navigate = useNavigate();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onSubmit = async (data, formikHelpers) => {
    try {
      const base64File = await toBase64(data.fee_guide_document);

      const payload = {
        province_code: data.provinceCode,
        specialty_code: data.specialtyCode,
        year_effective: data.yearEffective,
        fee_guide_document: base64File,
      };

      const uploadPromise = postData('/fee-guides', payload);

      toast.promise(
        uploadPromise.then(() => {
          formikHelpers.resetForm();
          navigate(PATHS.FRONT.DASHBOARD, { replace: true });
        }),
        {
          loading: Toasts.REFINERY.UPLOAD.BUSY,
          success: () => Toasts.REFINERY.UPLOAD.SUCCESS,
          error: (err) => {
            if (err.status === 409) return Toasts.REFINERY.UPLOAD.CONFLICT;
            if (err.serverError) return err.serverError;
            return Toasts.REFINERY.UPLOAD.FAILURE;
          },
        },
      );
    } catch (err) {
      toast.error('Failed to parse file for upload.');
    }
  };

  return (
    <PageFrame
      toolbar={<Toolbar />}
      pageContent={
        <PageContent>
          <FeeGuideForm onSubmit={onSubmit} />
        </PageContent>
      }
    />
  );
}

