function calculateDiscount(product) {
  if (product.promoPrice && !product.discountPercentage) {
    product.discountPercentage = (1 - product.promoPrice / product.price) * 100;
    return product;
  }
  if (!product.promoPrice && product.discountPercentage) {
    product.promoPrice =
      product.price - (product.price * product.discountPercentage) / 100;
    return product;
  }

  return product;
}
function validateDiscount(product) {
  if (product.promoPrice && product.discountPercentage) {
    if (
      product.promoPrice !==
      product.price - (product.price * product.discountPercentage) / 100
    ) {
      return false;
    }
  }
  return true;
}

export { calculateDiscount, validateDiscount };
