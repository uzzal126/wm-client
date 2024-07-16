// export const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? process.env.NEXT_PUBLIC_APP_BASE_URL
//     : process.env.NEXT_PUBLIC_APP_BASE_URL_SG;
export const BASE_URL =
  process.env.NEXT_PUBLIC_APP_BASE_URL || "https://sg-api.webmanza.com/";

// UPLOADER
// export const UPLOAD_FILE_URL = BASE_URL + "file/upload/file";
export const UPLOAD_FORM_ATTACHMENT = `${BASE_URL}file/v2/upload/file`;
// export const BASE64_UPLOAD = BASE_URL + "file/upload/base64";

// GET
export const GET_STORE_INFO = BASE_URL + "general/v2/store-info";
export const GET_COMPONENTS = BASE_URL + "general/v2/component/list";
export const GET_MENUS = BASE_URL + "general/v2/menu-list";
export const GET_CATEGORY_PRODUCTS = `${BASE_URL}product/v2/list/by/category`;
export const GET_TAG_PRODUCTS = `${BASE_URL}product/v2/list/by/tag`;
export const GET_CAMPAIGN_PRODUCTS = `${BASE_URL}product/v2/list/by/campaign`;
export const GET_PRODUCT_DETAILS = `${BASE_URL}product/v2/detail`;
export const GET_AREA_LIST = `${BASE_URL}customer/v2/area/list`;
export const GET_ZONE_LIST = `${BASE_URL}customer/v2/zone/list`;
export const GET_REGION_LIST = `${BASE_URL}customer/v2/region/list`;
export const GET_CITY_LIST = `${BASE_URL}customer/v2/city/list`;
export const GET_PRODUCT_LIST_BY_CATEGORY = `${BASE_URL}product/v2/list/by/category`;
export const BRAND_LIST = `${BASE_URL}product/v2/brand/list`;
export const TAG_LIST = `${BASE_URL}product/v2/tag/list`;
export const GET_CAMPAIGNS = `${BASE_URL}product/v2/campaign/list`;
export const GET_VARIANTS = `${BASE_URL}product/v2/variant-list`;

//POST
export const GET_ACCESS_TOKEN = `${BASE_URL}auth/v2/get-access-token`;
export const SUBMIT_ORDER = `${BASE_URL}order/v2/order-request`;
export const REGISTER_USER = `${BASE_URL}customer/v2/customer-registration`;
export const UPDATE_USER_PROFILE = `${BASE_URL}customer/v2/customer-profile-update`;
export const CUSTOMER_PASS_UPDATE = `${BASE_URL}customer/v2/customer-password-update`;
export const FORGOT_PASS_EMAIL = `${BASE_URL}customer/v2/send-email-to-customer-for-password-reset`;
export const EMAIL_SECRET = `${BASE_URL}customer/v2/verify-email-secret`;
export const PASSWORD_RESET = `${BASE_URL}customer/v2/customer-password-reset`;
export const ORDER_TRACKING = `${BASE_URL}order/v2/order-tracking`;
export const CLIENT_ACQUIRE_CHARGE = `${BASE_URL}order/v2/client-acquire-charge-url`;
export const COUPON_APPLY = `${BASE_URL}order/v2/coupon-apply`;
export const CHECK_PAYMENT_STATUS = `${BASE_URL}order/v2/check-payment-status`;
export const LOGIN_USER = `${BASE_URL}customer/v2/customer-login`;
export const ACCOUNT_DETAILS = `${BASE_URL}customer/v2/account-details`;
export const ADD_EDIT_ADDRESS = `${BASE_URL}customer/v2/add-edit-new-address`;
export const ORDER_LIST = `${BASE_URL}order/v2/order-list`;
export const ORDER_CANCEL = `${BASE_URL}order/v2/order-cancel`;
export const ORDER_DETAILS = `${BASE_URL}order/v2/order-details`;
export const WISH_LIST = `${BASE_URL}product/v2/product-wishlist`;
export const DELETE_ADDRESS = `${BASE_URL}customer/v2/delete-address`;
export const PAGE_DETAILS = `${BASE_URL}general/v2/page-details`;
export const UPDATE_CART = `${BASE_URL}product/v2/update-cart`;
export const WISHLIST_UPDATE = `${BASE_URL}product/v2/update-wishlist`;
export const PREBOOKING = `${BASE_URL}order/v2/pre-booking`;
export const CHECK_IMEI_LSO = `${BASE_URL}general/v2/search/service`;
export const GET_STP_LIST = `${BASE_URL}general/v2/custom/setting/service`;
export const CHECKOUT = `${BASE_URL}order/v2/checkout`;
export const GET_SHIPPING_FEE = `${BASE_URL}customer/v2/order/shipping-fee`;
export const POST_PROGRESS_LIST = `${BASE_URL}order/v2/progress/list`;
export const PRODUCT_REVIEW = `${BASE_URL}product/v2/product-review`;

// BLOG
export const GET_BLOG_POST = `${BASE_URL}general/v2/blog/post`;
export const GET_BLOG_CATEGORY = `${BASE_URL}general/v2/blog/category`;
export const GET_BLOG_BY_SLUG = `${BASE_URL}general/v2/blog/post-by-slug`;
export const GET_COMMENTS = `${BASE_URL}general/v2/blog/comment`;
export const GET_BLOG_SEARCH_RESULTS = `${BASE_URL}general/v2/blog/post`;

//FORM
export const POST_FORM_DATA = `${BASE_URL}customer/v2/request`;
export const POST_CONTACT_FORM = `${BASE_URL}customer/v2/feedback`;

//DELETE
export const FILE_DELETE = `${BASE_URL}file/v2/file`;

// JOB
export const GET_JOB_DETAILS = `${BASE_URL}general/v2/job`;
export const GET_ALL_JOBS = `${BASE_URL}general/v2/job`;
export const GET_APPLIED_JOBS = `${BASE_URL}general/v2/job/applied`;
export const APPLY_FOR_JOB = `${BASE_URL}general/v2/job/apply`;

// VISITOR

export const VISITOR_COUNTER = `${BASE_URL}api/increment-visitor-count`;
