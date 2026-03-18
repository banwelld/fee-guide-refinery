import { toBemClassName, isValidString } from '../../utils/helpers';

/**
 * @typedef ButtonProps
 * @property {string} label - Text to display (if children are null).
 * @property {string} [type="button"] - HTML button type. **Defaults to "button"** - Pass "submit" explicitly for forms.
 * @property {boolean} [displayAsText=false] - If true, adds "text" modifier so that styling can be applied appropriately.
 * @property {string} bemMod - BEM modifier for class generation.
 * @property {string} [bemMod2] - Second BEM modifier that resolves to "text" if displayAsText is true and can be used for other modifiers if displayAsText is false
 * @property {boolean} [showMod2] - Resolves to true if displayAsText is true or if displayAsText is false and BemMod2 is a string with the option to pass conditionals
 */

/** @param {ButtonProps} props
 *
 * Generic Button component for consistent UI styling.
 *
 * **IMPORTANT**: Component defaults to type="button". Pass "submit" for forms.
 *
 * **IMPORTANT**: Component discards children. Pass label instead.
 *
 * **IMPORTANT**: Component discards className props and creates its own as "button button--[bemMod] button--[bemMod2]"
 *
 * **IMPORTANT**: bemMod2 / showMod2 props passed are discarded if displayAsText is true.
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
