import 'dotenv/config'
import { PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import express from 'express'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: pool })

const app = express()
app.use(express.json())

// 🔹 Hardcoded test post route
app.get('/hardcoded-add-post', async (req, res) => {
  try {
    const authorEmail = "test@example.com"

    // User upsert (create if not exists)
    const user = await prisma.user.upsert({
      where: { email: authorEmail },
      update: {},
      create: { email: authorEmail, name: "Test User" }
    })

    // Hardcoded post create using authorId directly
    const post = await prisma.post.create({
    data: {
    title: "Hardcoded Test Post",
    content: "This post is added in test mode with hardcoded data.",
    authorId: user.id,
    updatedAt: new Date() // ✅ explicitly provide
  }
    })

    res.status(201).json({ message: "Hardcoded post added successfully", post })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Something went wrong (TEST MODE)" })
  }
})

