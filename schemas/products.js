import z from "zod"

const baseProductSchema = z.object({
    name: z.string().nonempty(),
    price: z.number().positive(),
    promoPrice: z.number().nonnegative(),
    discountPercentage: z.number().nonnegative(),
    weight: z.number().positive(),
    category: z.string().nonempty(),
    available: z.boolean(),
    img: z.string().url(),
});

const productSchema = baseProductSchema.refine((data) => {
    // Solo aplica el refinamiento si al menos uno de los campos está presente
    if (data.promoPrice === undefined && data.discountPercentage === undefined) {
        return true; // Ignora el refinamiento si no hay datos
    }

    // Calcula los valores faltantes
    if (!data.promoPrice && !data.discountPercentage) {
        data.promoPrice = data.price;
        data.discountPercentage = 0;
    }
    if (!data.discountPercentage && data.promoPrice) {
        data.discountPercentage = ((data.price - data.promoPrice) / data.price) * 100;
    } else if (!data.promoPrice && data.discountPercentage) {
        data.promoPrice = data.price - (data.price * (data.discountPercentage / 100));
    }
    return true;
}, {
    message: "Either promoPrice or discountPercentage must be provided",
    path: ["promoPrice", "discountPercentage"]
});

 function validateProduct(input) {
    return productSchema.safeParse(input);
}
 function validatePartialProduct(input) {
    const partialValidation=baseProductSchema.partial().safeParse(input);
    if(!partialValidation.success){
        return partialValidation;
    }


    return partialValidation;
}

export  { validateProduct, validatePartialProduct };