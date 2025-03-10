function calculateDiscount(product){
    
    if(product.promoPrice && !product.discountPercentage){

        product.discountPercentage = (1-(product.promoPrice/product.price))*100;
        return product;
    }
    if(!product.promoPrice && product.discountPercentage){
        product.promoPrice = product.price - (product.price * product.discountPercentage / 100);
        return product;
    }
    
    return product;
}
function validateDiscount(product){
   
    if(product.promoPrice == product.price - (product.price * product.discountPercentage / 100)){
        return true
    }
    if(product.discountPercentage == (1-(product.promoPrice/product.price))*100){
        return true
    }   
    return false;    
    
}

export {calculateDiscount, validateDiscount}