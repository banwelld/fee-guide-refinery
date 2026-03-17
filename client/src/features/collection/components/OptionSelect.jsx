import { useMemo } from 'react';
import { toBemClassName } from '../../../utils/helpers';
import { DataTypes } from '../../../config/constants';

const normalizeItems = (item) =>
  typeof item === DataTypes.STRING ? { value: item, label: item } : item;

/**
 * @typedef {Object} ListSelectorProps
 * @property {(string|{value: string, label: string})[]} items - an array of selectable items
 * @property {string} selected - the value of the selected item
 * @property {function} setState - setter function to set the selected item to state
 * @property {string} bemBlock - the block portion of the BEM classname
 */

/**
 * @param {ListSelectorProps}
 */
export default function OptionSelect({
  items,
  selected,
  setState,
  bemBlock = 'toolbar',
}) {
  const normalizedItems = useMemo(() => items.map(normalizeItems), [items]);

  return (
    <ul className={toBemClassName({ bemBlock, bemElem: 'list' })}>
      {normalizedItems.map(({ value, label }) => (
        <li
          key={value}
          className={toBemClassName({
            bemBlock,
            bemElem: 'list-item',
            bemMod2: 'selected',
            showMod2: value === selected,
          })}
          onClick={() => setState(value)}>
          {label}
        </li>
      ))}
    </ul>
  );
}
