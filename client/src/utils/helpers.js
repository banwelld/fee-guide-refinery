import { DataTypes } from '../config/constants';
import Feedback from '../config/feedback';

const { Errors } = Feedback;

// helper functions

// api calls and helpers

export const isValidString = (string) =>
  typeof string === DataTypes.STRING && string.trim().length > 0;

export const fetchJson = (path, options = {}) =>
  fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...options,
  }).then(async (res) => {
    if (res.status === 204) return null;
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(
        `Error (${options.method || 'GET'}): ${data.error || res.statusText}`,
      );
      error.status = res.status;
      error.serverError = data.error;
      throw error;
    }
    return data;
  });

export const getData = (path) => fetchJson(path);

export const deleteData = (path) => fetchJson(path, { method: 'DELETE' });

export const postData = (path, body) =>
  fetchJson(path, { method: 'POST', body: JSON.stringify(body) });

export const patchData = (path, body) =>
  fetchJson(path, { method: 'PATCH', body: JSON.stringify(body) });

export const runExclusive = ({ doFetch, lockRef, setPending, setIsLoaded }) => {
  if (lockRef.current) return;

  lockRef.current = true;
  setPending(true);

  return doFetch().finally(() => {
    lockRef.current = false;
    setPending(false);
    if (typeof setIsLoaded === DataTypes.FUNCTION) setIsLoaded(true);
  });
};

// formatting and normalizing

export const toPhoneNumFormat = (phoneString) => {
  if (!phoneString || phoneString.length !== 10)
    return '** Missing/Invalid Phone Number **';
  const areaCode = phoneString.slice(0, 3);
  const exchange = phoneString.slice(3, 6);
  const subscriber = phoneString.slice(6);

  return `(${areaCode}) ${exchange} - ${subscriber}`;
};

export const toBemClassName = ({
  bemBlock,
  bemElem,
  bemMod,
  bemMod2,
  showMod2 = false,
} = {}) => {
  if (!isValidString(bemBlock)) return 'invalid-missing-block';

  const baseClass = isValidString(bemElem)
    ? `${bemBlock}__${bemElem}`
    : `${bemBlock}`;

  let classes = [baseClass];
  if (isValidString(bemMod)) classes.push(`${baseClass}--${bemMod}`);
  if (isValidString(bemMod2) && showMod2)
    classes.push(`${baseClass}--${bemMod2}`);

  return classes.join(' ');
};

// error handling

export const logException = (message, err = null) =>
  console.error(message, err);
