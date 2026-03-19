import { Form, Formik } from 'formik';
import * as yup from 'yup';

import FormikInput from '../../../components/forms/FormikInput';
import Button from '../../../components/ui/Button';
import FormOptions from './FormOptions';

import PROVINCES from '../config/provinces';
import SPECIALTIES from '../config/specialties';

import {
  InputTypes as Input,
  DEFAULT_SELECT_VALUE as DEFAULT,
} from '../../../config/constants';
import * as v from '../../../utils/validation';

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

const getYearOptions = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const years = [];

  // add the next year on 1 october, when fee guides drop
  if (currentMonth >= 9) {
    years.push(currentYear + 1);
  }
  for (let i = 0; i < 5; i++) {
    years.push(currentYear - i);
  }
  return years;
};

export default function FeeGuideForm({ onSubmit }) {
  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <Formik {...formikProps} className='form form--refinery'>
      {({ setFieldValue, errors, touched }) => (
        <Form className='form__container'>
          <FormikInput
            name={Fields.PROVINCE_CODE}
            as={Input.SELECT}
            autoFocus={true}
            className='field field__select'>
            <FormOptions selections={PROVINCES} />
          </FormikInput>
          <FormikInput
            name={Fields.SPECIALTY_CODE}
            as={Input.SELECT}
            className='field field__select'>
            <FormOptions selections={SPECIALTIES} />
          </FormikInput>
          <FormikInput
            name={Fields.YEAR_EFFECTIVE}
            as={Input.SELECT}
            className='field field__select'>
            <FormOptions selections={getYearOptions()} isPrimitives={true} />
          </FormikInput>

          <div className='form__container--input'>
            <label
              className='form__label'
              htmlFor={Fields.DOCUMENT}
              style={{ fontWeight: 600 }}>
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
              className='field field__file'
            />
            {errors[Fields.DOCUMENT] && touched[Fields.DOCUMENT] && (
              <span>{' ' + errors[Fields.DOCUMENT]}</span>
            )}
          </div>

          <Button type='submit' label='Refine' bemMod='page-utility' />
        </Form>
      )}
    </Formik>
  );
}
