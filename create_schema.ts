import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
  datasources: { db: { url: 'postgresql://neondb_owner:npg_F9DtsS2zfPuh@ep-rapid-wildflower-abyotmnd.eu-west-2.aws.neon.tech/neondb?sslmode=require&schema=abrajtrwada' } },
  log: ['error'],
})
async function main() {
  await prisma.$executeRawUnsafe('CREATE SCHEMA IF NOT EXISTS abrajtrwada')
  console.log('✓ Schema "abrajtrwada" created/verified')
}
main().finally(async () => { await prisma.$disconnect() })
