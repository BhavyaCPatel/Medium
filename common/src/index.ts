import z from "zod";

export const signupInputs = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
})

export type SignupInputs = z.infer<typeof signupInputs>

export const signinInputs = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type SigninInputs = z.infer<typeof signinInputs>

export const createBlogsInput = z.object({
    title: z.string(),
    content: z.string(),
})

export type CreateBlogsInput = z.infer<typeof createBlogsInput>

export const updateBlogsInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})

export type UpdateBlogsInput = z.infer<typeof updateBlogsInput>