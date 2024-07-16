import sha256 from "js-sha256";
import moment from "moment";
import * as yup from "yup";
import { getAuth } from "../helpers/auth/AuthHelper";
var _ = require("lodash");

export const generateInitialValues = (data) => {
  let obj = {};
  for (let i = 0; i < data?.length; i++) {
    obj[`${i}_${data[i]?.type?.toLowerCase()}`] = "";
  }
  return obj;
};

export const commaFormat = (number) => {
  const interNumberFormat = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 7,
  });
  try {
    return interNumberFormat.format(number);
  } catch (e) {
    console.error(e);
  }
};

export default commaFormat;

export const getAgoTime = (date) => {
  let result = moment(date).fromNow();
  const now = moment();
  const days = now.diff(date, "days");
  const weeks = now.diff(date, "weeks");
  if (days >= 7) {
    if (days <= 13) {
      result = `a week ago`;
    } else if (days > 13 && days <= 25) {
      result = `${weeks} weeks ago`;
    }
  }
  return result;
};

export const genLabelValuePair = (values, labelArr) => {
  let target = [];

  const labelArrs = labelArr?.map((item) => item?.label);
  let fieldArrs = Object.keys(values);

  for (let i = 0; i < Object.keys(values)?.length; i++) {
    target.push({
      label: labelArrs[i],
      value: values[fieldArrs[i]],
    });
    // target[fieldArrs[i]] = {
    //   label: labelArrs[i],
    //   value: values[fieldArrs[i]],
    // };
  }
  return target;
};

export const generateSchema = (data) => {
  let obj = {};
  for (let i = 0; i < data?.length; i++) {
    if (data[i]?.type === "checkbox") {
      if (data[i]?.required) {
        obj[`${i}_${data[i]?.type?.toLowerCase()}`] = yup
          .boolean()
          .required(`${data[i]?.label || "This field"} is required`);
      } else {
        obj[`${i}_${data[i]?.type?.toLowerCase()}`] = yup.boolean().optional();
      }
    } else if (data[i]?.type === "upload") {
      if (data[i]?.required) {
        obj[`${i}_${data[i]?.type?.toLowerCase()}`] = yup
          .string()
          .url()
          .required(`${data[i]?.label || "This field"} is required`);
      } else {
        obj[`${i}_${data[i]?.type?.toLowerCase()}`] = yup.string().optional();
      }
    } else {
      if (data[i]?.required) {
        if (data[i]?.inputType === "email") {
          obj[`${i}_${data[i]?.type?.toLowerCase()}`] = yup
            .string()
            .email()
            .required(`${data[i]?.label || "This field"} is required`);
        } else {
          obj[`${i}_${data[i]?.type?.toLowerCase()}`] = yup
            .string()
            .required(`${data[i]?.label || "This field"} is required`);
        }
      } else {
        obj[`${i}_${data[i]?.type?.toLowerCase()}`] = yup.string().optional();
      }
    }
  }
  return yup.object().shape(obj);
};

export const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <>
        <span>
          0<span className="padding-l">:</span>
          <span className="timer-cal">Days</span>
        </span>
        <span>
          0<span className="padding-l">:</span>
          <span className="timer-cal">Hrs</span>
        </span>
        <span>
          0<span className="padding-l">:</span>
          <span className="timer-cal">Min</span>
        </span>
        <span>
          0<span className="timer-cal">Sec</span>
        </span>
      </>
    );
  } else {
    // Render a countdown
    return (
      <>
        <span>
          {days}
          <span className="padding-l">:</span>
          <span className="timer-cal">Days</span>
        </span>
        <span>
          {hours}
          <span className="padding-l">:</span>
          <span className="timer-cal">Hrs</span>
        </span>
        <span>
          {minutes}
          <span className="padding-l">:</span>
          <span className="timer-cal">Min</span>
        </span>
        <span>
          {seconds}
          <span className="timer-cal">Sec</span>
        </span>
      </>
    );
  }
};

// export const getThemeConfig = type => {
//   let theme = ThemeDefaultConfig
//   if (type) theme = theme[type]
//   return theme
// }

export const makeRandomString = (length = 6) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getDataByKey = (obj, type) => {
  return obj[type] || false;
};

export const deleteToObject = (obj, key) => {
  var temp = { ...obj };
  delete temp[`${key}`];
  return temp;
};
export const addToObject = (obj, key, value, index) => {
  var temp = {};
  var i = 0;

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (i === index && key && value) {
        temp[key] = value;
      }

      temp[prop] = obj[prop];

      i++;
    }
  }

  if (!index && key && value) {
    temp[key] = value;
  }

  return temp;
};

export const linkHelper = (stylePath) => {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = stylePath;
  return link;
};

export const imageCheckHelper = (imgSrc) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  var newImg = new Image();
  newImg.src = imgSrc;
  if (newImg.width > 0 && newImg.height > 0) return true;
  else return false;
};
export const imageDimentionHelper = (imgSrc, w, h, full = false) => {
  if (typeof window === "undefined" || typeof document === "undefined")
    return true;
  var newImg = new Image();
  newImg.src = imgSrc;
  var height = newImg.height;
  var width = newImg.width;
  if (full && imgSrc && width === w && height === h) {
    return true;
  } else if (
    (imgSrc && width === w && height === h) ||
    (width === 0 && height === 0)
  ) {
    return true;
  } else {
    return false;
  }
};
export function youtube_parser(url) {
  if (typeof url !== "string") {
    return false;
  }
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

export const getBannerRdirectURL = (item, menu_all) => {
  const url =
    typeof item?.redirect_url === "object"
      ? item?.redirect_url?.url_type
        ? linkHandler(item?.redirect_url, menu_all)
        : item?.redirect_url?.url
      : typeof item?.redirect_url === "string"
      ? item?.redirect_url
      : "#";
  return url;
};

export const getGalleryRdirectURL = (item, menu_all) => {
  const url =
    typeof item?.link === "object"
      ? item?.link?.url_type
        ? linkHandler(item?.link, menu_all)
        : item?.link?.url
      : typeof item?.link === "string"
      ? item?.link
      : "#";
  return url;
};

export const isSelfURL = (url) => {
  if (!url) return false;
  return !url.includes("http") && !url.includes("https");
};

export const bgGenaretor = (style, opacity) => {
  if (style?.type === "gradient") {
    return `${style?.value.type}-gradient( ${
      style?.value.type === "linear"
        ? style?.value.direction + "deg"
        : "circle at " + style?.value.direction
    }, rgba(${style?.value.color1.r}, ${style?.value.color1.g}, ${
      style?.value.color1.b
    }, ${style?.value.color1.a}) ${style?.value.start}%, rgba(${
      style?.value.color2.r
    }, ${style?.value.color2.g}, ${style?.value.color2.b}, ${
      style?.value.color2.a
    }) ${style?.value.end}% )`;
  } else if (style?.type === "color") {
    if (opacity) {
      return `rgba(${style?.value.r}, ${style?.value.g}, ${style?.value.b}, ${style?.value.opacity})`;
    } else {
      return `rgba(${style?.value.r}, ${style?.value.g}, ${style?.value.b}, ${style?.value.a})`;
    }
  } else if (style?.type === "image") {
    return `url(${style?.value.url[0]})`;
  }
};

export const styleGenerator = (styles) => {
  let styleTemp = {};
  styles &&
    Object.keys(styles).length > 0 &&
    Object.keys(styles).map((style, i) => {
      if (style === "padding") {
        styleTemp[
          "padding"
        ] = `${styles?.padding?.t}px ${styles?.padding?.r}px ${styles?.padding?.b}px ${styles?.padding?.l}px`;
      }
      if (style === "margin") {
        styleTemp[
          "margin"
        ] = `${styles?.margin?.t}px ${styles?.margin?.r}px ${styles?.margin?.b}px ${styles?.margin?.l}px`;
      }
      if (style === "border") {
        styleTemp[
          "borderRadius"
        ] = `${styles?.border?.radius.t}px ${styles?.border?.radius.r}px ${styles?.border?.radius.b}px ${styles?.border?.radius.l}px`;
        styleTemp["borderStyle"] = styles?.border?.border?.style;
        styleTemp[
          "borderWidth"
        ] = `${styles?.border?.border?.width.t}px ${styles?.border?.border?.width.r}px ${styles?.border?.border?.width.b}px ${styles?.border?.border?.width.l}px`;
        styleTemp[
          "borderColor"
        ] = `rgba(${styles?.border?.border?.color.r}, ${styles?.border?.border?.color.g}, ${styles?.border?.border?.color.b}, ${styles?.border?.border?.color.a})`;
      }
      if (style === "background") {
        styleTemp["background"] = bgGenaretor(styles?.background);
      }
    });
  return styleTemp;
};

export const onScrollIframe = (key) => {
  const iframeC = document.getElementById("iframe-container");
  const El = iframeC.contentWindow.document.getElementById(key);
  iframeC.contentWindow.scrollTo({ top: El.offsetTop, behavior: "smooth" });
};

export const sliderConfig = (config, device = [], total) => {
  let desktop = parseInt(device?.desktop_row);
  let tablet = parseInt(device?.tablet_row);
  let mobile = parseInt(device?.mobile_row);
  return {
    dots: config?.dots || false,
    infinite: false,
    arrows: config?.arrow || false,
    autoplay: config?.autoplay || true,
    speed: 500,
    row: 1,
    slidesToShow: total < desktop ? total : desktop || 6,
    slidesToScroll: total < desktop ? total : desktop || 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: total < tablet ? total : tablet || 3,
          slidesToScroll: total < tablet ? total : tablet || 3,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: total < mobile ? total : mobile || 2,
          slidesToScroll: total < mobile ? total : mobile || 2,
          arrows: false,
        },
      },
    ],
  };
};

export const check_date_expiry = (
  presentDate = Date.now(),
  compareDate = ""
) => {
  return moment(presentDate).isAfter(moment(compareDate));
};

export const list_to_tree = (dataList = []) => {
  let list = [];
  var map = {},
    node,
    roots = [],
    i;
  for (i = 0; i < dataList.length; i++) {
    map[dataList[i].id] = i;
    list.push({
      ...dataList[i],
      children: [],
    });
  }

  for (i = 0; i < list.length; i++) {
    node = list[i];
    if (node.parent !== 0) {
      // list[map[node.parent]].children.push(node);
      if (list[map[node.parent]]) list[map[node.parent]].children.push(node);
      else roots.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};
export const linkHandler = (item, allMenus) => {
  if (typeof item !== "object") {
    return "#";
  }
  let getItem =
    allMenus?.length > 0 ? allMenus.filter((f) => f.id === item.id) : [];

  if (getItem.length > 0) {
    getItem = getItem[0];
    if (getItem.url_type === "page") {
      let url = getItem.url;
      if (getItem.url.includes("/page")) {
        let parUrl = getItem.url.split("/");
        url = parUrl.length === 3 ? parUrl[2] : parUrl[1];
      }
      return `/${url}`;
    } else if (getItem?.url_type === "product") {
      if (
        getItem?.overview &&
        getItem?.overview != "" &&
        betterParse(getItem?.overview)
      ) {
        return betterParse(getItem.overview)?.has
          ? `/product/overview/${getItem?.url}`
          : `/product/${getItem?.url}`;
      } else {
        return `/${getItem.url_type}/${getItem.url}`;
      }
    } else {
      return `/${getItem.url_type}/${getItem.url}`;
    }
  } else if (item?.url_type === "custom") {
    return item?.url;
  }
  return "#";
};

export function hasItem(array, item) {
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    if (Array.isArray(current)) {
      if (hasItem(current, item)) {
        return true;
      }
    } else {
      if (current === item) {
        return true;
      }
    }
  }
  return false;
}

export const groupByThree = (data, n) => {
  var group = [];
  if (data && data.length > 0) {
    for (var i = 0, j = 0; i < data.length; i++) {
      if (i >= n && i % n === 0) j++;
      group[j] = group[j] || [];
      group[j].push(data[i]);
    }
  }
  return group;
};

export const objectSortByKey = (objectData) => {
  let tempData = [];
  objectData &&
    Object.keys(objectData).length > 0 &&
    Object.keys(objectData).map((key, i) => {
      let obj = { obj: objectData[key] };
      tempData.push({
        ...obj,
        scKey: key,
        sort:
          objectData[key].sort !== undefined
            ? parseInt(objectData[key].sort)
            : i,
      });
    });
  tempData = _.orderBy(tempData, ["sort"], "asc");
  let sortedData = {};
  tempData.map((item) => {
    sortedData[item.scKey] = item.obj;
  });
  return sortedData;
};

export const makeCategoryMenu = (category_menu, menu_list) => {
  const list = [];
  for (let i = 0; i < category_menu?.length; i++) {
    const categoryMenuItem = menu_list?.filter(
      (e) => e?.id == category_menu[i]?.id
    )[0];
    const existsInMenu = categoryMenuItem ? true : false;
    if (existsInMenu) {
      list?.push({
        ...category_menu[i],
        text: categoryMenuItem?.title,
      });
    }
  }

  return list;
};

export const getThumbnail = (item) => {
  const dummyImage = "https://dummyimage.com/600x620/d4d4d4/6b6a6b.jpg";

  if (item?.thumbnail?.src) {
    if (item?.thumbnail?.src?.length !== 0) {
      return item?.thumbnail?.src;
    }
  }

  if (item?.variants && item?.variants?.length > 0) {
    for (let i = 0; i < item?.variants?.length; i++) {
      if (
        item?.variants[i]?.thumbnail &&
        item?.variants[i]?.thumbnail?.length !== 0
      ) {
        return item?.variants[i]?.thumbnail;
      }
    }
  }

  if (item?.gallery && item?.gallery?.length > 0) {
    for (let i = 0; i < item?.gallery?.length; i++) {
      if (item?.gallery[i]?.src && item?.gallery[i]?.src !== 0) {
        return item?.gallery[i]?.src;
      }
    }
  }

  return dummyImage;
};

export const layoutToComponent = (value, id) => {
  let components = {};
  value &&
    value.length > 0 &&
    value.map((row) => {
      row.children &&
        row.children.length > 0 &&
        row.children.map((column) => {
          column.children &&
            column.children.length > 0 &&
            column.children.map((item) => {
              components[item.id] = item;
            });
        });
    });
  if (id) {
    components = components[id];
  }
  return components;
};

export const getProductURL = (product) => {
  return product.overview &&
    product.overview !== "" &&
    betterParse(product.overview)?.has
    ? `/product/overview/${product?.slug}`
    : `/product/${product?.slug}`;
};

export const getCategoryObject = (root_categories, menu_list) => {
  const makeList = (item) => {
    const list = [];
    // inserting sub categories
    for (let i = 0; i < menu_list?.length; i++) {
      if (
        menu_list[i]?.parent_id === item?.id ||
        menu_list[i]?.id === item?.id
      ) {
        list.push(menu_list[i]);
      }
    }
    // inserting sub sub categories
    for (let j = 0; j < list.length; j++) {
      const item = list[j];
      for (let i = 0; i < menu_list?.length; i++) {
        if (menu_list[i]?.parent_id === item?.id) {
          list.push(menu_list[i]);
        }
      }
    }

    return [...new Set(list)]?.sort((a, b) =>
      a.id > b.id ? 1 : a.id < b.id ? -1 : 0
    );
  };

  const obj = {};
  for (let i = 0; i < root_categories?.length; i++) {
    obj[root_categories[i]?.url] = makeList(root_categories[i]);
  }
  return obj;
};

export const formatPrice = (p) =>
  p !== null && p !== undefined
    ? p.toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    : p === 0
    ? "0"
    : "";

export const getPriceStringWithDiscount = (product) => {
  const { price, discount } = product;

  if (Array.isArray(discount)) {
    if (price?.max == price?.min || price?.min === 0) {
      if (discount && discount?.length > 0 && discount[0]?.type === "Fixed") {
        return formatPrice(
          price?.max - ((discount?.length > 0 && discount[0]?.amount) || 0)
        );
      } else if (
        discount &&
        discount?.length > 0 &&
        discount[0]?.type === "Percentage"
      ) {
        return formatPrice(
          price?.max -
            ((discount?.length > 0 &&
              price?.max * (discount[0]?.percent / 100)) ||
              0)
        );
      }
    } else {
      if (discount && discount?.length > 0 && discount[0]?.type === "Fixed") {
        return `${formatPrice(
          price?.min - (discount[0]?.amount || 0)
        )}-${formatPrice(
          price?.max - ((discount?.length > 0 && discount[0]?.amount) || 0)
        )}`;
      } else if (
        discount &&
        discount?.length > 0 &&
        discount[0]?.type === "Percentage"
      ) {
        return `${formatPrice(
          price?.min - (price?.min * (discount[0]?.percent / 100) || 0)
        )}-${formatPrice(
          price?.max -
            ((discount?.length > 0 &&
              price?.max * (discount[0]?.percent / 100)) ||
              0)
        )}`;
      }
    }
  } else {
    if (price?.max == price?.min || price?.min === 0) {
      if (discount && discount?.type === "Fixed") {
        return formatPrice(price?.max - (discount?.amount || 0));
      } else if (discount && discount?.type === "Percentage") {
        return formatPrice(
          price?.max - (price?.max * (discount?.percent / 100) || 0)
        );
      }
    } else {
      if (discount && discount?.type === "Fixed") {
        return `${formatPrice(
          price?.min - (discount?.amount || 0)
        )}-${formatPrice(price?.max - (discount?.amount || 0))}`;
      } else if (discount && discount?.type === "Percentage") {
        return `${formatPrice(
          price?.min - (price?.min * (discount?.percent / 100) || 0)
        )}-${formatPrice(
          price?.max - (price?.max * (discount?.percent / 100) || 0)
        )}`;
      }
    }
  }
};

export const getPriceStringWithoutDiscount = (product) => {
  const { price } = product;

  if (price?.max == price?.min) {
    return formatPrice(price?.max);
  } else {
    return `${formatPrice(price?.min)}-${formatPrice(price?.max)}`;
  }
};

export const kebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

export const styleGenaretor = (styles) => {
  let styleTemp = {};
  styles &&
    Object.keys(styles).length > 0 &&
    Object.keys(styles).map((style, i) => {
      if (style === "padding") {
        styleTemp[
          "padding"
        ] = `${styles?.padding?.t}px ${styles?.padding?.r}px ${styles?.padding?.b}px ${styles?.padding?.l}px`;
      }
      if (style === "margin") {
        styleTemp[
          "margin"
        ] = `${styles?.margin?.t}px ${styles?.margin?.r}px ${styles?.margin?.b}px ${styles?.margin?.l}px`;
      }
      if (style === "border") {
        styleTemp[
          "borderRadius"
        ] = `${styles?.border?.radius.t}px ${styles?.border?.radius.r}px ${styles?.border?.radius.b}px ${styles?.border?.radius.l}px`;
        styleTemp["borderStyle"] = styles?.border?.border?.style;
        styleTemp[
          "borderWidth"
        ] = `${styles?.border?.border?.width.t}px ${styles?.border?.border?.width.r}px ${styles?.border?.border?.width.b}px ${styles?.border?.border?.width.l}px`;
        styleTemp[
          "borderColor"
        ] = `rgba(${styles?.border?.border?.color.r}, ${styles?.border?.border?.color.g}, ${styles?.border?.border?.color.b}, ${styles?.border?.border?.color.a})`;
      }
      if (style === "background") {
        styleTemp["background"] = bgGenaretor(styles?.background);
      }
    });
  return styleTemp;
};

export const getTimeFromUnixValue = (time, format = "YYYY-MM-DD hh:mm:ss") => {
  if (!Number(time)) return;

  const a = new Date(time * 1000);

  return moment(a).format(format);
};

export const getDefaultVariant = (product) => {
  if (!product || !product?.variants) return null;
  if (
    !Array.isArray(product?.variants) ||
    Array.isArray(product?.variants && product?.variants?.length === 0)
  ) {
    return null;
  }
  const { variants } = product;
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    if (variant?.in_stock > 0) {
      return variant;
    }
  }
  return null;
};

export const getDefaultVariantIndex = (product) => {
  if (!product || !product?.variants) return null;
  // if (
  //   !Array.isArray(product?.variants) ||
  //   Array.isArray(product?.variants && product?.variants?.length === 0)
  // ) {
  //   return null;
  // }
  const { variants } = product;
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    if (variant?.in_stock > 0) {
      return i;
    }
  }
  return null;
};

export const findUnique = (arr, predicate) => {
  var found = {};
  arr.forEach((d) => {
    found[predicate(d)] = d;
  });
  return Object.keys(found).map((key) => found[key]);
};

export const getDiscountPrice = (product, variant) => {
  const item =
    Array.isArray(product?.variants) && product?.variants?.length > 0
      ? product?.variants[variant]
      : null;
  if (!item) return 0;
  const { price } = item;
  const general_discont = price?.general_discount_amount || 0;
  const campaign_discount = price?.campaign_discount_amount || 0;
  // const common_discount = product?.discount?.amount || 0;

  const discount = Math.max(general_discont, campaign_discount);
  const selling_price = price?.selling_price || 0;

  return selling_price - discount;
};

export const getDiscountPriceVariant = (product, variantObject) => {
  const item = variantObject;
  if (!item) return 0;
  const { price } = item;
  const general_discont = price?.general_discount_amount || 0;
  const campaign_discount = price?.campaign_discount_amount || 0;
  // const common_discount = product?.discount?.amount || 0;

  const discount = Math.floor(Math.max(general_discont, campaign_discount));
  const selling_price = price?.selling_price || 0;

  return selling_price - discount;
};

export const getNormalPrice = (product, variant) => {
  const item =
    Array.isArray(product?.variants) && product?.variants?.length > 0
      ? product?.variants[variant]
      : null;
  if (!item) return 0;

  const { price } = item;
  const selling_price = price?.selling_price || 0;

  return selling_price;
};

export const getNormalPriceVariant = (product, variantObject) => {
  const item = variantObject;
  if (!item) return 0;

  const { price } = item;
  const selling_price = price?.selling_price || 0;

  return selling_price;
};

export const getDiscountAmountVariant = (product, variantObject) => {
  const item = variantObject;
  if (!item) return 0;
  const { price } = item;
  const general_discont = price?.general_discount_amount || 0;
  const campaign_discount = price?.campaign_discount_amount || 0;
  // const common_discount = product?.discount?.amount || 0;

  const discount = Math.floor(Math.max(general_discont, campaign_discount));

  return discount;
};
export const getDiscountPercentVariant = (product, variantObject) => {
  const price = getNormalPriceVariant(product, variantObject);
  const discount = getDiscountAmountVariant(product, variantObject) * 100;
  const percent = Math.ceil(discount / price >= 0 ? discount / price : 0);

  return percent;
};

export const wishlistHandler = (addWishlist, product, router) => {
  let user = getAuth();
  if (user && user?.id) {
    addWishlist(product);
  } else {
    router.push("/auth/login");
  }
};

export function searchValueInArrayObjects(array, value) {
  const results = [];

  for (const obj of array) {
    for (const prop in obj) {
      if (
        obj[prop].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1
      ) {
        results.push(obj);
        break;
      }
    }
  }

  return results;
}

export const initialValuesForOrderData = {
  customer: {
    id: null,
    name: "",
    email: "",
    country: "BD",
    msisdn: "",
    // address_type: shippingInfo?.address_type,
    area_id: 0,
    city_id: 0,
    zone_id: 0,
    region_id: 0,
    street_address: "",
    address: {
      id: null,
      msisdn: "",
      name: "",
      address_type: "",
      area_id: 0,
      city_id: 0,
      zone_id: 0,
      region_id: 0,
      street_address: "",
    },
  },
  products: [],
  // shipping_address_details,
  price: 0,
  discount: 0,
  extra_discount: 0,
  subtotal: 0,
  shipping_fee: 0,
  tax: 0,
  total: 0,
  paid_amount: 0,
  order_status: 1,
  shipping_status: 1,
  payment_status: 1,
  shipping_method: 1,
  payment_method: 0,
  payment_channel: 1,
  weight: 0,
  courier_enable: false,
  courier_store_id: 0,
  delivery_type: 48,
  partial_payment: false,
  coupon_code: "",
  coupon_discount: 0,
};

export const validationSchemaForOrderData = yup.object({
  customer: yup.object({
    id: yup.string(),
    name: yup.string(),
    email: yup.string(),
    country: yup.string(),
    msisdn: yup.string(),
    area_id: yup.number(),
    city_id: yup.number(),
    zone_id: yup.number(),
    region_id: yup.number(),
    street_address: yup.string(),
    address: yup.object({
      id: yup.string(),
      msisdn: yup.string(),
      name: yup.string(),
      address_type: yup.string(),
      area_id: yup.number(),
      city_id: yup.number(),
      zone_id: yup.number(),
      region_id: yup.number(),
      street_address: yup.string(),
    }),
  }),
  products: yup.array(),
  price: yup.number(),
  discount: yup.number(),
  extra_discount: yup.number(),
  subtotal: yup.number(),
  shipping_fee: yup.number(),
  tax: yup.number(),
  total: yup.number(),
  paid_amount: yup.number(),
  order_status: yup.number(),
  shipping_status: yup.number(),
  payment_status: yup.number(),
  shipping_method: yup.number(),
  payment_method: yup.number(),
  payment_channel: yup.number(),
  weight: yup.number(),
  courier_enable: yup.boolean(),
  courier_store_id: yup.number(),
  delivery_type: yup.number(),
  partial_payment: yup.boolean(),
  coupon_code: yup.string(),
  coupon_discount: yup.number(),
});

export const getAddressFromLocalStorage = () => {
  try {
    const address_list = betterParse(localStorage.getItem("address_list"));
    if (Array.isArray(address_list)) {
      return address_list;
    }
  } catch (err) {
    return [];
  }
};

export const checkStrLen = (s) => {
  if (typeof s !== "string") return 0;

  return s.length;
};

export const getFileExtension = (filename) =>
  filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
  filename;

export const phoneRegExp = /(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/;

export const getIndexOfObject = (list, object, prop) => {
  for (let i = 0; Array.isArray(list) && i < list.length; i++) {
    if (object && object[prop] === list[i][prop]) {
      return i;
    }
  }
  return null;
};

export const isOrderValid = (
  cartItems,
  selectedAdr,
  address,
  privacy_policy = [],
  agreed
) => {
  if (Array.isArray(privacy_policy) && privacy_policy?.length > 0 && !agreed)
    return false;
  if (cartItems.length === 0) {
    return false;
  }
  if (address.length > 0 && selectedAdr !== null) {
    return true;
  } else {
    return false;
  }
};

export const prepareOrderData = (data) => {
  const {
    cartItems,
    selectedItems,
    shipping_address,
    subtotal,
    shipping_fee,
    total,
    weight,
    user_id,
    payment_method,
    coupon_code,
    coupon_discount,
  } = data;

  const product_details = [];
  let price = 0;
  let discount = coupon_discount || 0;
  for (let i = 0; i < cartItems?.length; i++) {
    if (!selectedItems.includes(i)) continue;

    price += cartItems[i]?.variants?.selling_price * cartItems[i]?.qty;
    const item_discount = getDiscountAmountVariant(
      cartItems[i],
      cartItems[i].variants
    );
    discount += item_discount * cartItems[i]?.qty;

    product_details?.push({
      id: cartItems[i]?.id,
      attribute_id: cartItems[i]?.variants?.id,
      product_quantity: cartItems[i]?.qty,
      discount: item_discount * cartItems[i]?.qty,
      price: getNormalPriceVariant(cartItems[i], cartItems[i]?.variants),
      qty: cartItems[i]?.qty,
      tax: 0,
      total_price:
        getDiscountPriceVariant(cartItems[i], cartItems[i].variants) *
        cartItems[i]?.qty,
      stock: cartItems[i]?.variants?.in_stock,
      offer: 0,
      rate: getNormalPriceVariant(cartItems[i], cartItems[i]?.variants),
      weight: cartItems[i]?.shipping_attribute?.weight || 1,
    });
  }

  const order_data = {
    customer: {
      id: user_id || null,
      name: shipping_address?.name,
      email: shipping_address?.email,
      country: "BD",
      msisdn:
        shipping_address?.msisdn ||
        shipping_address?.phone ||
        shipping_address?.mobile,
      // address_type: shippingInfo?.address_type,
      area_id: shipping_address?.area_id || 0,
      city_id: shipping_address?.city_id || 0,
      zone_id: shipping_address?.zone_id || 0,
      region_id: shipping_address?.region_id || 0,
      street_address: shipping_address?.address,
      address: {
        id: shipping_address?.id,
        msisdn:
          shipping_address?.msisdn ||
          shipping_address?.phone ||
          shipping_address?.mobile,
        name: shipping_address?.name,
        address_type: shipping_address?.address_type,
        area_id: shipping_address?.area_id || 0,
        city_id: shipping_address?.city_id || 0,
        zone_id: shipping_address?.zone_id || 0,
        region_id: shipping_address?.region_id || 0,
        street_address: shipping_address?.address,
      },
    },
    products: product_details,
    // shipping_address_details,
    //* price = sum of product price without discount
    price: price,
    discount: discount,
    extra_discount: 0,
    //* subtotal: summation of price with discount
    subtotal: price - discount,
    shipping_fee: shipping_fee,
    tax: 0,
    // * total = subtotal + shipping_fee
    total: price + (shipping_fee || 0) - discount,
    paid_amount: 0,
    order_status: 1,
    shipping_status: 1,
    payment_status: 1,
    shipping_method: 1,
    payment_method,
    payment_channel: 1,
    weight: weight,
    courier_enable: false,
    courier_store_id: 0,
    delivery_type: 48,
    partial_payment: false,
    coupon_code,
    coupon_discount,
  };

  return order_data;
};

export const formatLongString = (string = "", charsToKeep = 1) => {
  try {
    if (string?.length > charsToKeep) {
      return `${string?.slice(0, charsToKeep)}...`;
    } else {
      return string;
    }
  } catch (e) {
    return string;
  }
};

export const betterParse = (data) => {
  if (typeof data === "object") {
    return data;
  } else if (Array.isArray(data)) {
    return data;
  } else if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("parse err");
      return data;
    }
  } else if (typeof data?.feature_list === "string") {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("parse err");
      return data;
    }
  } else {
    console.error("parse err");
    return data;
  }
};

export const getFontName = (
  data = { body_font: "poppins", header_font: "Inter" },
  key = "body_font"
) => {
  if (typeof data !== "string") {
    return data;
  }
  if (typeof data === "string" && !data?.includes(key)) {
    return data;
  }
  if (typeof data === "string" && data?.includes(key)) {
    return betterParse(data)[key];
  }
};

const generatePagination = (currentPage, pageCount) => {
  const getRange = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((v, i) => i + start);
  };
  let delta;
  if (pageCount <= 5) {
    // delta === 7: [1 2 3 4 5 6 7]
    delta = 5;
  } else {
    // delta === 2: [1 ... 4 5 6 ... 10]
    // delta === 4: [1 2 3 4 5 ... 10]
    delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4;
  }

  const range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2),
  };

  if (range.start - 1 === 1 || range.end + 1 === pageCount) {
    range.start += 1;
    range.end += 1;
  }

  let pages =
    currentPage > delta
      ? getRange(
          Math.min(range.start, pageCount - delta),
          Math.min(range.end, pageCount)
        )
      : getRange(1, Math.min(pageCount, delta + 1));

  const withDots = (value, pair) =>
    pages.length + 1 !== pageCount ? pair : [value];

  if (pages[0] !== 1) {
    pages = withDots(1, [1, "..."]).concat(pages);
  }

  if (pages[pages.length - 1] < pageCount) {
    pages = pages.concat(withDots(pageCount, ["...", pageCount]));
  }

  return pages;
};

export const generatePaginationObj = (current, total, itemPerPage) => {
  let arrTotal = Math.ceil(total / itemPerPage);
  let result = {
    pagination: {
      page: current,
      from:
        current * itemPerPage - itemPerPage > total
          ? total
          : current * itemPerPage - itemPerPage + 1,
      to: current * itemPerPage > total ? total : current * itemPerPage,
      items_per_page: itemPerPage,
      total: total,
      links: [],
    },
  };
  let links = [];
  if (current > 1) {
    links.push({
      label: "&laquo; Previous",
      page: current - 1,
      active: false,
      url: `/?page=${current - 1}`,
    });
  }
  let genPage = generatePagination(current, arrTotal);
  if (genPage.length > 0) {
    genPage.map((item) => {
      links.push({
        label: item.toString(),
        page: item === "..." ? null : item,
        active: item === current,
        url: item === "..." ? null : `/?page=${item}`,
      });
    });
  }

  if (current < arrTotal) {
    links.push({
      label: "Next &raquo;",
      page: current + 1,
      active: false,
      url: `/?page=${current + 1}`,
    });
  }
  result = {
    ...result,
    pagination: { ...result.pagination, links: links },
  };
  return result;
};

export const getHasMore = (res) => {
  if (res?.data?.payload?.pagination?.links?.length > 0) {
    const last =
      res?.data?.payload?.pagination?.links[
        res?.data?.payload?.pagination?.links?.length - 1
      ];

    if (last && last?.label?.toLowerCase()?.includes("next")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const parseJson = (item) => {
  if (!item) return "";
  try {
    const a = betterParse(item);
    return a;
  } catch (err) {
    return "";
  }
};

export const setDecimal = (price, digit = 2) => {
  if (!price || !Number(price)) {
    return Number(0).toFixed(digit);
  }
  return Number(price).toFixed(digit);
};

export const isShopLayout = (data, value) => {
  if (data) {
    if (data?.general_settings) {
      if (data?.general_settings?.shop_page) {
        if (data?.general_settings?.shop_page?.layout) {
          if (data?.general_settings?.shop_page?.layout === value) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

export const makeSet = (list) => {
  if (!list || !Array.isArray(list)) return [];
  return [...new Set(list)];
};

export const msisdnMakeFormate = ($msisdn) => {
  $msisdn = trim($msisdn);
  if (is_numeric($msisdn)) {
    if (
      strlen($msisdn) == 13 &&
      (substr($msisdn, 0, 5) == "88013" ||
        substr($msisdn, 0, 5) == "88014" ||
        substr($msisdn, 0, 5) == "88015" ||
        substr($msisdn, 0, 5) == "88016" ||
        substr($msisdn, 0, 5) == "88017" ||
        substr($msisdn, 0, 5) == "88018" ||
        substr($msisdn, 0, 5) == "88019")
    )
      return $msisdn;
    else if (
      strlen($msisdn) == 14 &&
      (substr($msisdn, 0, 6) == "+88013" ||
        substr($msisdn, 0, 6) == "+88014" ||
        substr($msisdn, 0, 6) == "+88015" ||
        substr($msisdn, 0, 6) == "+88016" ||
        substr($msisdn, 0, 6) == "+88017" ||
        substr($msisdn, 0, 6) == "+88018" ||
        substr($msisdn, 0, 6) == "+88019")
    )
      return substr($msisdn, 1);
    else if (
      strlen($msisdn) == 15 &&
      (substr($msisdn, 0, 7) == "0088013" ||
        substr($msisdn, 0, 7) == "0088014" ||
        substr($msisdn, 0, 7) == "0088015" ||
        substr($msisdn, 0, 7) == "0088016" ||
        substr($msisdn, 0, 7) == "0088017" ||
        substr($msisdn, 0, 7) == "0088018" ||
        substr($msisdn, 0, 7) == "0088019")
    )
      return substr($msisdn, 2);
    else if (
      strlen($msisdn) == 11 &&
      (substr($msisdn, 0, 3) == "013" ||
        substr($msisdn, 0, 3) == "014" ||
        substr($msisdn, 0, 3) == "015" ||
        substr($msisdn, 0, 3) == "016" ||
        substr($msisdn, 0, 3) == "017" ||
        substr($msisdn, 0, 3) == "018" ||
        substr($msisdn, 0, 3) == "019")
    )
      return "88".$msisdn;
    else if (
      strlen($msisdn) == 10 &&
      (substr($msisdn, 0, 2) == "13" ||
        substr($msisdn, 0, 2) == "14" ||
        substr($msisdn, 0, 2) == "15" ||
        substr($msisdn, 0, 2) == "16" ||
        substr($msisdn, 0, 2) == "17" ||
        substr($msisdn, 0, 2) == "18" ||
        substr($msisdn, 0, 2) == "19")
    )
      return "880".$msisdn;
    else return null;
  } else {
    return null;
  }
};

export function getGravatarURL(email, size = 80) {
  // Trim leading and trailing whitespace from
  // an email address and force all characters
  // to lower case
  const address = String(email).trim().toLowerCase();

  // Create a SHA256 hash of the final string
  const hash = sha256(address);

  // Grab the actual image URL
  return `https://www.gravatar.com/avatar/${hash}?s=${size}`;
}
