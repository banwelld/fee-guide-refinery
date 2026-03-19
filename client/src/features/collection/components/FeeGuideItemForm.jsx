import { Form, Formik } from 'formik';
import * as yup from 'yup';
import FormikInput from '../../../components/forms/FormikInput';
import Button from '../../../components/ui/Button';

import { InputTypes as Input } from '../../../config/constants';
import * as v from '../../../utils/validation';

export const Fields = Object.freeze({
  FEE_MIN: 'feeMinCents',
  FEE_MAX: 'feeMaxCents',
  HAS_L_FLAG: 'hasLFlag',
  HAS_E_FLAG: 'hasEFlag',
});

// Assuming basic validation logic
const validationSchema = yup.object({
  [Fields.FEE_MIN]: yup
    .number()
    .min(0, 'Cannot be negative')
    .required('Required'),
  [Fields.FEE_MAX]: yup
    .number()
    .min(0, 'Cannot be negative')
    .required('Required'),
  [Fields.HAS_L_FLAG]: yup.boolean(),
  [Fields.HAS_E_FLAG]: yup.boolean(),
});

export default function FeeGuideItemForm({
  onSubmit,
  item,
  children,
  enableReinitialize = true,
}) {
  const initialValues = {
    [Fields.FEE_MIN]: item ? (item[Fields.FEE_MIN] / 100).toFixed(2) : '0.00',
    [Fields.FEE_MAX]: item ? (item[Fields.FEE_MAX] / 100).toFixed(2) : '0.00',
    [Fields.HAS_L_FLAG]: item ? item[Fields.HAS_L_FLAG] : false,
    [Fields.HAS_E_FLAG]: item ? item[Fields.HAS_E_FLAG] : false,
  };

  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize,
  };

  return (
    <>
      <h2 className='heading--update-form'>Edit Pricing</h2>
      <Formik {...formikProps}>
        {({ values }) => (
          <>
            <Form className='form form__item-update'>
              <FormikInput
                name={Fields.FEE_MIN}
                as={Input.INPUT}
                type={Input.NUMBER}
                step='0.01'
                placeholder='min fee ($)'
                autoComplete='off'
                className='field__input'
                label='Min Fee ($)'
              />
              <FormikInput
                name={Fields.FEE_MAX}
                as={Input.INPUT}
                type={Input.NUMBER}
                step='0.01'
                placeholder='max fee ($)'
                autoComplete='off'
                className='field__input'
                label='Max Fee ($)'
              />
              <FormikInput
                name={Fields.HAS_L_FLAG}
                as={Input.INPUT}
                type='checkbox'
                className='field__checkbox'
                label='+L Flag'
              />
              <FormikInput
                name={Fields.HAS_E_FLAG}
                as={Input.INPUT}
                type='checkbox'
                className='field__checkbox'
                label='+E Flag'
              />

              <Button
                type='submit'
                label='Save Changes'
                className='button--secondary button--full-width'
              />

              {typeof children === 'function' ? children(values) : children}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
