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
      <Form className='form, form--auth'>
        <FormikInput
          name={Fields.EMAIL}
          as={Input.INPUT}
          type={Input.EMAIL}
          placeholder='corporate email address'
          autoComplete='username'
          autoFocus={true}
          className='form__input, form__input--input'
        />
        <FormikInput
          name={Fields.PASSWORD}
          as={Input.INPUT}
          type={Input.PASSWORD}
          placeholder='password'
          autoComplete='current-password'
          className='form__input, form__input--input'
        />
        <Button type='submit' label={'Login'} className='page-utility' />
      </Form>
    </Formik>
  );
}
