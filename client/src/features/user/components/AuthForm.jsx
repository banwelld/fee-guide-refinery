import { Form, Formik } from 'formik';
import * as yup from 'yup';

import FormikInput from '../../../components/forms/FormikInput';
import Button from '../../../components/ui/Button';

import { InputTypes as Input } from '../../../config/constants';
import * as v from '../../../utils/validation';

const Fields = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

const initialValues = {
  [Fields.EMAIL]: '',
  [Fields.PASSWORD]: '',
};

const validationSchema = yup.object({
  [Fields.EMAIL]: v.validateEmail,
  [Fields.PASSWORD]: v.validatePassword,
});

export default function AuthForm({ onSubmit }) {
  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <Formik {...formikProps}>
      <Form className='form form--auth'>
        <FormikInput
          name={Fields.EMAIL}
          label={'Email'}
          as={Input.INPUT}
          type={Input.EMAIL}
          placeholder='e.g., john.doe@domain.com'
          autoComplete='username'
          autoFocus={true}
          className='field field--input'
        />
        <FormikInput
          name={Fields.PASSWORD}
          label={'Password'}
          as={Input.INPUT}
          type={Input.PASSWORD}
          placeholder=''
          autoComplete='current-password'
          className='field field--input'
        />
        <Button type='submit' label='Login' className='button--session-state' />
      </Form>
    </Formik>
  );
}
