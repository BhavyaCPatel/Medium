import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { verify } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const token = c.req.header('Authorization')
    if (!token) {
        c.status(401)
        return c.json({ error: 'No Token' })
    }
    // const jwt = token.split(' ')[1]
    const user = await verify(token, c.env.JWT_SECRET)
    if (user) {
        c.set("jwtPayload", { userId: user.id });
        await next()
    } else {
        c.status(403)
        return c.json({ error: 'User not logged in.' })
    }
})

blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('jwtPayload').userId
    const body = await c.req.json()
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
        const blog = await prisma.blog.findMany({});
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
            where: { id: Number(id) },
        })
        return c.json({ blog })
    } catch (error) {
        c.status(403)
        return c.json({ error: 'Error while fetching the blog' })
    }
})

