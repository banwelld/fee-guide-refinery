import Button from './Button';

import { toBemClassName } from '../../utils/helpers';

/**
 * **ClickHere**
 *
 * An inline 'click here' button (displayed as text) with a description of the click action,
 * surrounded by a <div> wrapper.
 *
 * **Wrapper className** - click-here__wrapper
 * **Button className** - button--click-here
 *
 * @param {string} actionDescription
 * @param {function} onClick
 */
export default function ClickHere({ actionDescription, onClick }) {
  const clickHere = (
    <Button
      displayAsText
      onClick={onClick}
      label='Click here'
      bemMod='click-here'
    />
  );

  const classNameProps = {
    bemBlock: 'click-here',
    bemElem: 'wrapper',
  };

  return (
    <div className={toBemClassName(classNameProps)}>
      <span>
        {clickHere} to {actionDescription}.
      </span>
    </div>
  );
}
