import { Form, Formik } from 'formik';
import * as yup from 'yup';

import FormikInput from '../../../../../components/forms/FormikInput';
import Button from '../../../../../components/ui/Button';
import ProvinceOptions from '../../../../../components/forms/options/ProvinceOptions';

import { InputTypes as Input } from '../../../../../config/constants';
import { toBemClassName } from '../../../../../utils/helpers';
import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../../../config/enums';
import * as v from '../../../../../utils/validation';

export const Fields = Object.freeze({
  ADDRESS_LINE_1: 'addressLine1',
  ADDRESS_LINE_2: 'addressLine2',
  CITY: 'city',
  PROVINCE_CODE: 'provinceCode',
  POSTAL_CODE: 'postalCode',
});

const initialValues = {
  [Fields.ADDRESS_LINE_1]: '',
  [Fields.ADDRESS_LINE_2]: '',
  [Fields.CITY]: '',
  [Fields.PROVINCE_CODE]: DEFAULT,
  [Fields.POSTAL_CODE]: '',
};

const validationSchema = yup.object({
  [Fields.ADDRESS_LINE_1]: v.validateAddressLine1,
  [Fields.ADDRESS_LINE_2]: v.validateAddressLine2,
  [Fields.CITY]: v.validateCity,
  [Fields.PROVINCE_CODE]: v.validateSelectOption,
  [Fields.POSTAL_CODE]: v.validatePostalCd,
});

const bemMod = 'delivery-address';

export default function FeeGuideForm({ onSubmit, address = null }) {
  const formikProps = {
    initialValues: !!address ? address : initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <Formik {...formikProps}>
      <Form className={toBemClassName({ bemBlock, bemMod })}>
        <FormikInput
          name={Fields.ADDRESS_LINE_1}
          as={Input.INPUT}
          type={Input.TEXT}
          placeholder='street address'
          autoComplete='address-line1'
          autoFocus={true}
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <FormikInput
          name={Fields.ADDRESS_LINE_2}
          as={Input.INPUT}
          type={Input.TEXT}
          placeholder='unit, building, etc. (optional)'
          autoComplete='address-line1'
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <FormikInput
          name={Fields.CITY}
          as={Input.INPUT}
          type={Input.TEXT}
          placeholder='city'
          autoComplete='address-level2'
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <FormikInput
          name={Fields.PROVINCE_CODE}
          as={Input.SELECT}
          type={null}
          placeholder={null}
          autoComplete='address-level1'
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}>
          <ProvinceOptions />
        </FormikInput>
        <FormikInput
          name={Fields.POSTAL_CODE}
          as={Input.INPUT}
          type={Input.TEXT}
          placeholder='postal code'
          autoComplete='postal-code'
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <Button type='submit' label='Save' bemMod='page-utility' />
      </Form>
    </Formik>
  );
}
