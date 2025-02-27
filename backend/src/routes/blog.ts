import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { verify } from 'hono/jwt'
import { createBlogsInput, updateBlogsInput } from "@bhavyapatel/medium-common"


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("jwtPayload", { userId: user.id });
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('jwtPayload').userId
    const body = await c.req.json()
    const { success } = createBlogsInput.safeParse(body)
    if (!success) {
        c.status(411);
        return c.json({ error: "Invalid input" });
    }
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        return c.json({ id: blog.id })
    } catch (error) {
        c.status(403)
        return c.json({ error: 'Error while posting the blog' })
    }
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = updateBlogsInput.safeParse(body)
    if (!success) {
        c.status(411);
        return c.json({ error: "Invalid input" });
    }

    try {
        const blog = await prisma.blog.update({
            where: { id: body.id },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json({ id: blog.id })
    } catch (error) {
        c.status(403)
        return c.json({ error: 'Error while updating the blog' })
    }
})

blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        console.log(blog)
        return c.json({ blog })
    } catch (error) {
        c.status(403)
        return c.json({ error: 'Error while fetching all the blogs' })
    }
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findUnique({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            },
            where: { id: Number(id) },
        })
        return c.json({ blog })
    } catch (error) {
        c.status(403)
        return c.json({ error: 'Error while fetching the blog' })
    }
})

