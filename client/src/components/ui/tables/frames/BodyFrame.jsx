import { toBemClassName } from '../../../../utils/helpers';

export default function BodyFrame({ bemRoot, children }) {
  return (
    <tbody className={toBemClassName({ ...bemRoot, bemElem: 'body' })}>
      {children}
    </tbody>
  );
}
