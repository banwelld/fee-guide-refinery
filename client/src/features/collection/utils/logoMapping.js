import abLogo from '../assets/association-logos/ab-dental-association-logo.png';
import bcLogo from '../assets/association-logos/bc-dental-association-logo.png';
import mbLogo from '../assets/association-logos/mb-dental-association-logo.png';
import nbLogo from '../assets/association-logos/nb-dental-association-logo.png';
import nlLogo from '../assets/association-logos/nl-dental-association-logo.png';
import nsLogo from '../assets/association-logos/ns-dental-association-logo.png';
import ntLogo from '../assets/association-logos/nt-dental-association-logo.png';
import onLogo from '../assets/association-logos/on-dental-association-logo.png';
import qcLogo from '../assets/association-logos/qc-dental-association-logo.png';
import skLogo from '../assets/association-logos/sk-dental-association-logo.png';
import ytLogo from '../assets/association-logos/yt-dental-association-logo.png';

const LOGOS = {
  AB: abLogo,
  BC: bcLogo,
  MB: mbLogo,
  NB: nbLogo,
  NF: nlLogo,
  NL: nlLogo,
  NS: nsLogo,
  NT: ntLogo,
  NU: ntLogo,
  ON: onLogo,
  QC: qcLogo,
  SK: skLogo,
  YT: ytLogo,
};

export const getProvinceLogo = (provinceCode) => {
  return LOGOS[provinceCode] || null;
};

export const getProvinceName = (provinceCode) => {
  const names = {
    AB: 'Alberta',
    BC: 'British Columbia',
    MB: 'Manitoba',
    NB: 'New Brunswick',
    NF: 'Newfoundland & Labrador',
    NL: 'Newfoundland & Labrador',
    NS: 'Nova Scotia',
    NT: 'Northwest Territories',
    NU: 'Nunavut',
    ON: 'Ontario',
    PE: 'Prince Edward Island',
    QC: 'Quebec',
    SK: 'Saskatchewan',
    YT: 'Yukon',
  };
  return names[provinceCode] || provinceCode;
};
