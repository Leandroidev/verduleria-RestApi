import z from "zod";

const baseUserSchema = z.object({
  userName: z.string().nonempty(),
  password: z.string().nonempty(),
});
function validateUser(input) {
  return baseUserSchema.safeParse(input);
}
export { validateUser };
