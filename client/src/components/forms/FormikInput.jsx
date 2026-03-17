import { useField } from 'formik';

export default function FormikInput({
  label,
  as = 'input',
  children,
  ...props
}) {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;

  const Component = as;

  const componentProps = {
    className: isError ? 'error' : '',
    ...field,
    ...props,
  };

  return (
    <div className='input-wrapper' data-error={isError ? meta.error : ''}>
      <Component {...componentProps}>{children}</Component>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
    </div>
  );
}
