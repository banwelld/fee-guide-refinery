export const DEFAULT_SELECT_VALUE = 'DEFAULT_SELECT_VALUE';

export const UserRole = {
  ADMIN: 'data_admin',
  MANAGER: 'manager',
  USER: 'business_user',
  PUBLIC: 'public',
};

export const DataTypes = {
  FUNCTION: 'function',
  NUMBER: 'number',
  OBJECT: 'object',
  STRING: 'string',
};

export const Headings = {
  FG_REFINERY: 'Fee Guide Refinery',
  FG_REFINERY_LOGO: 'Fee Guide Refinery logo',
  AUTH_MAIN: 'Provincial fee guide loading... Without the hassle!',
  AUTH_LOAD: 'Automated extraction from PDF',
  AUTH_OUTPUT: 'Configurable output formats (JSON, CSV, text)',
  AUTH_COMPLIANT: '100% dental association compliance',
  AUTH_SECURE: 'Role-based controls',
  AUTH_VALUE: 'Unmatched value & peace of mind',
  DASHBOARD_HEAD: 'Fee Guide Collection',
  DASHBOARD_SUBHEAD: 'Manage and refine your provincial dental fee guides.',
  REFINERY: 'Fee Guide Data Extraction',
  CONTACT_US: 'Contact Us',
};

export const LinkLabel = {
  REFINE: 'Refine Fee Guide',
};

export const UiText = {
  AUTH_MAIN: [
    `Fee Guide Refinery eliminates the manual effort of provincial dental fee guide management. Upload a PDF and walk away — your structured data is ready in seconds.`,
  ],
  AUTH_LOAD: [
    `Our extraction engine reads provincial fee guide PDFs directly — no copy-paste, no reformatting, no manual entry.`,
    `Procedure codes, fee amounts, indicators, and categories are identified and structured automatically, even as fee guide formats change year over year.`,
    `Built for benefits administrators, insurers, and dental software teams who need accurate, association-aligned fee data without the spreadsheet chaos.`,
  ],
  AUTH_OUTPUT: [
    `Extracted data is delivered in the format your workflow demands: JSON for API integration, CSV for spreadsheet import, or plain text for legacy systems.`,
    `Every export is clean, consistently structured, and ready to load without transformation.`,
  ],
  AUTH_COMPLIANT: [
    `Fee Guide Refinery is built against published Canadian Dental Association procedure code standards and validated against provincial association guides.`,
    `You get data you can trust — structured the way dental associations intended it.`,
  ],
  AUTH_SECURE: [
    `Access is organized by role: Managers control account configuration and user access, Business Users submit and retrieve fee guide data, and Data Admins manage extraction and export operations.`,
    `Each user sees only the tools and data relevant to their function.`,
  ],
  AUTH_VALUE: [
    `Save thousands per year in administrative costs by automating the most tedious part of dental fee management.`,
    `But the real value is priceless: your employees are freed from mind-numbing manual entry, and with 100% automated precision, there's no room for human error.`,
  ],
  GENERAL_ERROR: [
    <strong>ERROR 404:</strong>,
    `The page that you're trying to access doesn't exist. Please confirm that
    you've typed in the URL correctly and try again. Or, simply click on the
    links above to navigate through the site. If the error persists, feel free
    to call our support desk to report the error.`,
  ],
  MISSING_CONFIG: [
    `Configuration file is missing or invalid. Cannot render page. If this
    persists, please contact suport.`,
  ],
  NOT_LOGGED_IN: [
    <strong>ERROR 401:</strong>,
    `You must be logged in to view this page. Please login or register to continue.`,
  ],
  NO_FEE_GUIDES: ['Your collection is empty. Start by adding a new fee guide.'],
  REFINERY: [
    `Enter all data into the form below, being sure to attach the fee guide
      that corresponds to the province, specialty, and year that you're selecting.`,
    `When you've done all that, just hit "REFINE" and you'll have your fee guide
      data in seconds.`,
  ],
};

export const InputTypes = Object.freeze({
  EMAIL: 'email',
  INPUT: 'input',
  NUMBER: 'number',
  PASSWORD: 'password',
  PHONE: 'tel',
  SELECT: 'select',
  TEXT: 'text',
  TEXTAREA: 'textarea',
});

export const Specialties = {
  GEN: 'general_practice',
  PUB: 'public_health',
  ENDO: 'endodontics',
  ORTHO: 'orthodontics',
  PED: 'pediatrics',
  PERIO: 'periodontics',
  PROS: 'prosthodontics',
  OMFP: 'oral_maxillofacial_pathology',
  OMFR: 'oral_maxillofacial_radiology',
  OMFS: 'oral_maxillofacial_surgery',
};
