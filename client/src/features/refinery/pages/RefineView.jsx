import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import PageContent from './PageContent';
import Toolbar from './Toolbar';
import AuthForm from '../../user/components/AuthForm';
import PageFrame from '../../../components/ui/frames/PageFrame';

import Feedback from '../../../config/feedback';
import PATHS from '../../../config/paths';

const { Toasts } = Feedback;

export default function RefineView() {
  const navigate = useNavigate();
  const { isLoggedIn, userAuth } = useUser();
  const { login } = userAuth;

  const onSubmit = (data) =>
    toast.promise(
      login(data).then((user) => {
        navigate(PATHS.FRONT.DASHBOARD, { replace: true });
        return user;
      }),
      {
        loading: Toasts.USER.LOGIN.BUSY,
        success: (user) => Toasts.USER.LOGIN.SUCCESS,
        error: (err) => {
          if (err.status === 401) return Toasts.USER.LOGIN.BAD_CREDS;
          if (err.status === 422 && err.serverError) return err.serverError;

          return Toasts.USER.LOGIN.FAILURE;
        },
      },
    );

  const Login = <AuthForm onSubmit={onSubmit} />;

  const contentProps = {
    onSubmit,
    isLoggedIn,
  };

  return (
    <PageFrame
      toolbar={<Toolbar toolbarControls={Login} />}
      pageContent={<PageContent {...contentProps} />}
    />
  );
}
