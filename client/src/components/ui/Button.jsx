/**
 * Generic Button component for consistent UI styling.
 *
 * **IMPORTANT**: Component defaults to type="button". Pass "submit" for forms.
 *
 * **IMPORTANT**: Component discards children. Pass label instead.
 */
export default function Button({
  label,
  type = 'button',
  displayAsText = false,
  className,
  children,
  ...props
}) {
  const buttonProps = { type, ...props };
  return (
    <button
      {...buttonProps}
      className={displayAsText ? `${className} button--text` : className}>
      {label}
    </button>
  );
}
