import * as yup from 'yup';
import { DEFAULT_SELECT_VALUE } from '../config/enums';

const REQUIRED = '** Required Field **';

// field type definitions

export const validateAddressLine1 = yup
  .string('must be a string')
  .min(5, '5 characters minimum')
  .test(
    'no-leading-trailing-spaces',
    'Leading or trailing spaces not allowed',
    (value) => value === value?.trim(),
  )
  .required(REQUIRED);

export const validatePriceCents = yup
  .number('must be a number')
  .integer('must be a whole number (price x 100)')
  .min(99, 'must be at least 99')
  .required(REQUIRED);

export const validateTextarea = yup
  .string('must be a string')
  .min(30, 'must be at least 30 characters')
  .max(500, 'must not exceed 500 characters')
  .required(REQUIRED);

export const validateAddressLine2 = yup
  .string('must be a string')
  .min(3, '3 characters minimum')
  .test(
    'no-leading-trailing-spaces',
    'Leading or trailing spaces not allowed',
    (value) => value === value?.trim(),
  );

export const validatePackageQuantity = yup
  .string('must be a string')
  .min(1, '1 characters minimum')
  .test(
    'no-leading-trailing-spaces',
    'Leading or trailing spaces not allowed',
    (value) => value === value?.trim(),
  );

export const validateCity = yup
  .string('must be a string')
  .min(2, '2 characters min.')
  .max(20, '20 characters max.')
  .test(
    'no-leading-trailing-spaces',
    'Leading or trailing spaces not allowed',
    (value) => value === value?.trim(),
  )
  .required(REQUIRED);

export const validateProductName = yup
  .string('must be a string')
  .min(5, '5 characters min.')
  .max(32, '32 characters max')
  .test(
    'no-leading-trailing-spaces',
    'Leading or trailing spaces not allowed',
    (value) => value === value?.trim(),
  )
  .required(REQUIRED);

export const validateSelectOption = yup
  .string('must be a string')
  .notOneOf([DEFAULT_SELECT_VALUE], REQUIRED)
  .required(REQUIRED);

export const validatePostalCd = yup
  .string('must be a string')
  .required(REQUIRED)
  .test(
    'no-leading-trailing-spaces',
    'Leading or trailing spaces not allowed',
    (value) => value === value?.trim(),
  )
  .test('one-space-only', 'Postal codes may only have one space.', (value) => {
    const spaceCount = value.length - value.replaceAll(' ', '').length;
    return spaceCount < 2;
  })
  .test(
    'six-characters-only',
    'Postal codes may only contain 6 characters.',
    (value) => {
      const codeLength = value.replaceAll(' ', '').length;
      return codeLength === 6;
    },
  )
  .test('validity', 'Not a valid Canadian postal code', (value) =>
    /^([A-Za-z]\d){3}$/.test(value.replaceAll(' ', '') || ''),
  );

export const validateEmail = yup
  .string('must be a string')
  .email('Invalid email.')
  .required(REQUIRED);

export const validateRequiredString = yup
  .string('must be a string')
  .notOneOf([DEFAULT_SELECT_VALUE], REQUIRED)
  .min(1, 'Must not be empty string')
  .test(
    'no-leading-trailing-spaces',
    'Leading or trailing spaces not allowed',
    (value) => value === value?.trim(),
  )
  .required(REQUIRED);

export const validateName = yup
  .string('must be a string')
  .min(2, '2 characters min.')
  .max(30, '30 characters max.')
  .test(
    'no-leading-trailing-spaces',
    'Leading or trailing spaces not allowed',
    (value) => value === value?.trim(),
  )
  .required(REQUIRED);

export const validatePhone = yup
  .string('must be a string')
  .required(REQUIRED)
  .test('length', 'Must be exactly 10 digits', (value) =>
    /^\d{10}$/.test(value || ''),
  )
  .test('nanp-validation', 'Not a valid phone number.', (value) => {
    if (!value) return false;
    return (
      value[0] !== '0'
      && value[0] !== '1'
      && value[3] !== '0'
      && value[3] !== '1'
      && value[1] !== value[2]
    );
  });

export const validatePassword = yup
  .string('must be a string')
  .required(REQUIRED)
  .min(10, 'Password must be at least 10 characters long')
  .test(
    'lowercase',
    'At least 1 lowercase letters',
    (value) => (value?.match(/[a-z]/g) || []).length >= 1,
  )
  .test(
    'uppercase',
    'At least 1 uppercase letter',
    (value) => (value?.match(/[A-Z]/g) || []).length >= 1,
  )
  .test('digit', '1 digit', (value) => (value?.match(/\d/g) || []).length >= 1)
  .test(
    'special',
    'At least 1 special characters',
    (value) => (value?.match(/[^A-Za-z0-9]/g) || []).length >= 1,
  )
  .matches(/^\S*$/, 'No spaces allowed');

export const validateConfirmPassword = yup
  .string('must be a string')
  .oneOf([yup.ref('password'), null], 'Passwords must match one another.')
  .required(REQUIRED);
