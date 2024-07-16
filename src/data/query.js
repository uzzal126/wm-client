import BlogData from './blog'
import products from './product'

export const getProducts = (type, indexFrom = 0, limit = 8, id) => {
  let pts = products
  if (id) pts = products.filter((f, i) => f.id === id && ((i) => indexFrom && i <= limit))
  else if (type) {
    pts = products.filter((f, i) => f.type === type)
    pts = pts.slice(indexFrom, limit)
  }
  return pts
}
export const getBlogs = (type, indexFrom = 0, limit = 8) => {
  let pts = BlogData
  if (type) {
    pts = BlogData.filter((f, i) => f.type === type)
    pts = pts.slice(indexFrom, limit)
  }
  return pts
}

export const blog = (args) => BlogData.filter((e) => e.type === args.type)

export const getBrands = (type) => {
  const data = products.filter((item) => item.type === type)
  const brands = [...new Set(data?.map((item) => item.brand))]
  return {brand: brands}
}
export const getColors = (type) => {
  const color = []
  const data = products.filter((item) => item.type === 'fashion' || item.type === type)
  data?.filter((product) => {
    product.variants.filter((variant) => {
      if (variant.color) {
        const index = color.indexOf(variant.color)
        if (index === -1) color.push(variant.color)
      }
    })
  })
  return {colors: color}
}
export const getSize = (type) => {
  const sizes = []
  const data = products.filter((item) => item.type === 'fashion' || item.type === type)
  data?.filter((product) => {
    product.variants.filter((variant) => {
      if (variant.size) {
        const index = sizes.indexOf(variant.size)
        if (index === -1) sizes.push(variant.size)
      }
    })
  })
  return {size: sizes}
}
export const newProducts = (args) => {
  return products.filter((item) => {
    var cond = Boolean
    if (args.type) cond = item.type === args.type && item.new === true
    else cond = item.new === true

    return cond
  })
}
// export const getProducts = (args) => {
//   const indexFrom = 0
//   return products.splice(indexFrom, indexFrom + args.limit)
// }
