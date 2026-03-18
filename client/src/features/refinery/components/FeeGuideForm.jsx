import { Form, Formik } from 'formik';
import * as yup from 'yup';

import FormikInput from '../../../../../components/forms/FormikInput';
import Button from '../../../../../components/ui/Button';
import FormOptions from './FormOptions';

import PROVINCES from '../config/provinces';
import SPECIALTIES from '../config/specialties';

import { InputTypes as Input } from '../../../../../config/constants';
import { toBemClassName } from '../../../../../utils/helpers';
import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../../../config/enums';
import * as v from '../../../../../utils/validation';

export const Fields = Object.freeze({
  PROVINCE_CODE: 'provinceCode',
  SPECIALTY_CODE: 'specialtyCode',
  YEAR_EFFECTIVE: 'yearEffective',
  DOCUMENT: 'fee_guide_document',
});

const initialValues = {
  [Fields.PROVINCE_CODE]: DEFAULT,
  [Fields.SPECIALTY_CODE]: DEFAULT,
  [Fields.YEAR_EFFECTIVE]: new Date().getFullYear(),
  [Fields.DOCUMENT]: null,
};

const validationSchema = yup.object({
  [Fields.PROVINCE_CODE]: v.validateSelectOption,
  [Fields.SPECIALTY_CODE]: v.validateSelectOption,
  [Fields.YEAR_EFFECTIVE]: v.validateYear,
  [Fields.DOCUMENT]: v.validateFile,
});

const bemMod = 'refinery-form';

export default function FeeGuideForm({ onSubmit }) {
  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  const fieldClass = toBemClassName({
    bemBlock: 'form',
    bemElem: 'field',
    bemMod,
  });

  return (
    <Formik {...formikProps}>
      {({ setFieldValue, errors, touched }) => (
        <Form className={toBemClassName({ bemBlock: 'form', bemMod })}>
          <FormikInput
            name={Fields.PROVINCE_CODE}
            as={Input.SELECT}
            type={null}
            placeholder={null}
            className={fieldClass}>
            <FormOptions selections={PROVINCES} />
          </FormikInput>

          <FormikInput
            name={Fields.SPECIALTY_CODE}
            as={Input.SELECT}
            type={null}
            placeholder={null}
            className={fieldClass}>
            <FormOptions selections={SPECIALTIES} />
          </FormikInput>

          <FormikInput
            name={Fields.YEAR_EFFECTIVE}
            as={Input.INPUT}
            type='number'
            placeholder='Year Effective'
            className={fieldClass}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <label htmlFor={Fields.DOCUMENT} style={{ fontWeight: 600 }}>
              Fee Guide Document (PDF) *
            </label>
            <input
              id={Fields.DOCUMENT}
              name={Fields.DOCUMENT}
              type='file'
              accept='application/pdf'
              onChange={(event) => {
                setFieldValue(Fields.DOCUMENT, event.currentTarget.files[0]);
              }}
            />
            {errors[Fields.DOCUMENT] && touched[Fields.DOCUMENT] && (
              <span style={{ color: 'red', fontSize: '0.85rem' }}>
                {errors[Fields.DOCUMENT]}
              </span>
            )}
          </div>

          <Button type='submit' label='Refine' bemMod='page-utility' />
        </Form>
      )}
    </Formik>
  );
}
