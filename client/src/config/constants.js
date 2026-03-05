export const DataTypes = {
  FUNCTION: 'function',
  NUMBER: 'number',
  OBJECT: 'object',
  STRING: 'string',
};

export const Headings = {
  ADMIN_PROFILE: 'Product Admin Profile',
  ADMIN_VIEW_SIDEBAR: `Product Selection`,
  CART: `My Shopping Cart`,
  CART_EMPTY: `Empty Cart`,
  CART_LIST: `Cart Contents`,
  CART_PRODUCTS: `Product List`,
  CART_TOTALS: `Cart Totals`,
  CHECKOUT: `Checkout`,
  CHECKOUT_CONFIRM: `Order Submission`,
  CHECKOUT_CONFIRMATION: `Order Confirmation`,
  CHECKOUT_DELIVERY: `Delivery Address`,
  DATA_MISSING: 'Config Data Missing or Invalid',
  EDIT_PRODUCT: `Edit Product`,
  PRODUCT_CATALOG_HEAD: `Grocery2Go`,
  PRODUCT_CATALOG_SUBHEAD: `Home - Product Listing`,
  LOGIN: `Welcome Back`,
  MISSING_INVALID: 'Missing or Invalid Data',
  ORDER_CANCELLED: `Cancelled Order`,
  ORDER_DETAILS: `Order Details`,
  ORDER_FULFILLED: `Fulfilled Order`,
  ORDER_IN_PROCESS: `In-Process Order`,
  ORDER_LIST: `Product List`,
  ORDER_SUBMITTED: `Submitted Order`,
  ORDER_TOTALS: `Order Totals`,
  ORDER_UNKNOWN: `Order (unknown type)`,
  PRODUCT: `Product Details`,
  PRODUCT_SELECTOR: `Select a product`,
  PRODUCT_SIDEBAR: `In Your Cart`,
  PRODUCT_UPDATE: 'Manage Products',
  PRODUCTS: `Our Products`,
  REALTIME_VIEW: 'View Updates',
  REGISTER: `Sign Up!`,
  WHOOPS: `Whoops!`,
  UPDATE_PASSWORD: `Update Password`,
  UPDATE_USER_INFO: `Update Personal Information`,
  USER_PROFILE: `My Profile`,
  USER_INFO: `Personal Information`,
  USER_ORDERS: `Order History`,
};

export const UiText = {
  CART_EMPTY: [
    `Your cart is empty. Click on the 'Home' link in the header to do some
    shopping`,
  ],
  CHECKOUT_CONFIRMATION: [
    `If the above information is correct, click the 'submit' button to complete
    your order. We will notify you via email of payment options.`,
  ],
  CHECKOUT_DELIVERY: [
    `Please enter tha delivery address for your order and click the 'Save'
    button. Once the address is saved, you'll be able to click 'Next' to
    advance to the order confirmation page.`,
  ],
  CHECKOUT_USER_INFO: [
    `Please confirm your user information by clicking the checkbox below. If
      the information is out of date or incorrect, use the 'click here' link
      to update it. Once it's updated, click next to enter the delivery
      address.`,
  ],
  GENERAL_ERROR: [
    <strong>ERROR 404:</strong>,
    `The page that you're trying to access doesn't exist. Please confirm that
    you've typed in the URL correctly and try again. Or, simply click on the
    links above to navigate through the site. If the error persists, feel free
    to call our support desk to report the error.`,
  ],
  INVALID_PRODUCT_ID: (id) => [
    <strong>INVALID ID:</strong>,
    `We have no product in our collection with ID '${id}'.`,
  ],
  INVALID_PRODUCT_SELECTION: [
    `The product that you selected is not valid. Please choose another from
      the list.`,
  ],
  LOGIN: [
    `In order to provide you with products of the highest quality and at the
    best prices, we must have an active and engaged membership. As such,
    you'll need to login to the site to take advantage of Grocery2Go's
    benefits.`,
    `Not a member yet? We'd love to have you sign up!`,
  ],
  MISSING_CONFIG: [
    `Configuration file is missing or invalid. Cannot render page. If this
    persists, please contact suport.`,
  ],
  NO_ORDERS: [`You have no orders to display.`],
  NOT_LOGGED_IN: [
    <strong>ERROR 401:</strong>,
    `You must be logged in to view this page. Please login or register to continue.`,
  ],
  ORDER: [
    `Here's your order! You can click on a product's name to visit its
    information page where you can add it to your current shopping cart.`,
  ],
  PREV_ORDERS: [
    `Here is a list of your previous orders. You can click on an order's date
    to view its product list and details, to cancel an unfulfilled order, or
    to delete a cancelled order.`,
  ],
  REGISTER: [
    `We're thrilled that you've decided to create an account! Just give us a
    little info about yourself and you'll be all ready to load up a shopping
    cart with gourmet ingredients and farm fresh meats and produce.`,
    `All fields are mandatory so be sure to complete the entire form. Your
    password must consist of at least 10 characters with a lowercase and
    uppercase character, a digit and a special character (e.g., !@#$%).`,
  ],
  SUMMARY: [
    `Hover over any row to reveal controls. You can click on a product's name
    to visit its page or click the up or down buttons to make sure you have
    enough of a product. The trash button removes a product completely.`,
    `Wanna checkout? Just click the 'Check me Out!' button below the product
    list.`,
  ],
  USER_PROFILE: [
    `Welcome to your profile. Feel free to browse your personal information or
    your previous orders list.`,
    `If you notice that your information needs updating or would like to update
    your password, you'll find an update button in the sidebar. And, although
    we'd hate to see you close your account, we understand that people
    sometimes have to do that. You'll find that option in the sidebar, as
    well.`,
  ],
  USER_INFO_CONFIRM: [
    `By checking this box, I affirm that the above information is accurate
    and complete.`,
  ],
  WRONG_USER: [
    <strong>ERROR 403:</strong>,
    `You've attempted to access a profile with an ID that doesn't match the ID
      that you're logged into. Please use the 'View my Profile' link or enter
      the URL with your correct ID.`,
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
