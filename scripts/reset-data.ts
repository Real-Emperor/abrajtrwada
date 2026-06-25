// Re-seed properties and news in the abrajtrwada schema with new UAE photos
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: { db: { url: 'postgresql://neondb_owner:npg_F9DtsS2zfPuh@ep-rapid-wildflower-abyotmnd.eu-west-2.aws.neon.tech/neondb?sslmode=require&schema=abrajtrwada' } },
  log: ['error'],
})

async function main() {
  // Delete all existing properties and news (cascade will handle inquiries/viewings)
  const deletedProps = await prisma.property.deleteMany({})
  const deletedNews = await prisma.newsArticle.deleteMany({})
  console.log(`✓ Deleted ${deletedProps.count} properties and ${deletedNews.count} news articles`)

  // Now trigger the seed API to recreate with new photos
  console.log('\nNow trigger /api/seed on the live site to recreate with new UAE photos.')
}

main().finally(async () => { await prisma.$disconnect() })
