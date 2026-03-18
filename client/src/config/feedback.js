const Modals = {
  CONFIRM_CANCEL: `Cancellation is permanent. Are you sure that you want to
  cancel your order?`,
  CONFIRM_CHECKOUT: `Click 'Place Order' to confirm order submission.`,
  CONFIRM_DELETE_ORDER: `Deletion is permanent. Are you sure that you want to
  delete your order?`,
  CONFIRM_DELETE_USER: `Deletion is permanent. Your account and all of your
  orders will be deleted. Are you sure that you want to delete your account?`,
  CONFIRM_DELETE_PRODUCT: `Deletion is permanent. Are you sure that you want to delete this product?`,
  CONFIRM_LOGOUT: `Are you sure that you want to logout?`,
};

const Toasts = {
  USER: {
    DELETE: {
      BUSY: `Deleting user...`,
      FAILURE: `Could not delete user`,
      ORDERS_PENDING: `User has unfulfilled orders`,
      SUCCESS: `User deleted`,
    },
    LOGIN: {
      BAD_CREDS: `Invalid email or password`,
      BUSY: `Logging in...`,
      FAILURE: `Could not login.`,
      SUCCESS: `: Logged in!`,
    },
    LOGOUT: {
      BUSY: `Logging out...`,
      FAILURE: `Could not logout.`,
      SUCCESS: `Logged out`,
    },
    REGISTER: {
      BUSY: `Registering...`,
      FAILURE: `Could not register.`,
      SUCCESS: `: Registered!`,
    },
    UPDATE: {
      BUSY: `Updating...`,
      FAILURE: `Could not update.`,
      SUCCESS: `Update successful`,
    },
  },
  COLLECTION: {
    LOAD: {
      FAILURE: `Could not load fee guides.`,
    },
    CREATE: {
      BUSY: `Creating fee guide...`,
      FAILURE: `Could not create fee guide.`,
      SUCCESS: `Fee guide created!`,
    },
    DELETE: {
      BUSY: `Deleting fee guide...`,
      FAILURE: `Could not delete fee guide.`,
      SUCCESS: `Fee guide deleted.`,
    },
    UPDATE: {
      BUSY: `Updating fee guide...`,
      FAILURE: `Could not update fee guide.`,
      SUCCESS: `Fee guide updated!`,
    },
  },
  GUIDE_ITEM: {
    SEARCH: {
      NOT_FOUND: `Code not found in this fee guide.`,
    },
    UPDATE: {
      FAILURE: `Failed to update item.`,
      SUCCESS: (code) => `Code ${code} updated successfully.`,
    },
    DELETE: {
      FAILURE: `Failed to delete item.`,
      SUCCESS: `Item deleted successfully.`,
    },
  },
  REFINERY: {
    UPLOAD: {
      BUSY: `Extracting data from document...`,
      FAILURE: `Extraction failed.`,
      CONFLICT: `This fee guide already exists!`,
      SUCCESS: `Extraction complete!`,
    },
  },
};

const Errors = {
  FAILURE: {
    CREATE: `CRUD 'create' request failed.`,
    DELETE: `CRUD 'delete' request failed.`,
    RECEIVE: `CRUD 'receive' request failed.`,
    UPDATE: `CRUD 'update' request failed.`,
  },
  INVALID: {
    CREDENTIALS: `Email address or password were invalid.`,
    DATA: (expected, got) => `Invalid data: Expected '${expected}',
    got '${got}'.`,
    ID: (idType) => `ID (${idType}) not found.`,
    STATUS: (expected, got) => `Invalid status: Expected '${expected}',
    got '${got}'.`,
  },
  MISSING_CREDENTIALS: `Email address and/or password were missing.`,
};

const Feedback = {
  Errors,
  Modals,
  Toasts,
};

export default Feedback;
