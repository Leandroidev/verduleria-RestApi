import z from "zod";

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

function validateProduct(input) {
  return baseProductSchema.safeParse(input);
}
function validatePartialProduct(input) {
  return baseProductSchema.partial().safeParse(input);
}
export { validateProduct, validatePartialProduct };
