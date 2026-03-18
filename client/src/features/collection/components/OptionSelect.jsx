import { useMemo } from 'react';
import { DataTypes } from '../../../config/constants';

const normalizeItems = (item) =>
  typeof item === DataTypes.STRING ? { value: item, label: item } : item;

/**
 * @typedef {Object} ListSelectorProps
 * @property {(string|{value: string, label: string})[]} items - an array of selectable items
 * @property {string} selected - the value of the selected item
 * @property {function} setState - setter function to set the selected item to state
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
    <ul>
      {normalizedItems.map(({ value, label }) => (
        <li key={value} onClick={() => setState(value)}>
          {label}
        </li>
      ))}
    </ul>
  );
}
