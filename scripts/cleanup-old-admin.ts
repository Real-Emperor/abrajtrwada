// Delete the old admin user from the abrajtrwada schema
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: { db: { url: 'postgresql://neondb_owner:npg_F9DtsS2zfPuh@ep-rapid-wildflower-abyotmnd.eu-west-2.aws.neon.tech/neondb?sslmode=require&schema=abrajtrwada' } },
  log: ['error'],
})

async function main() {
  // List all admin users
  const allAdmins = await prisma.adminUser.findMany()
  console.log('Current admin users:')
  for (const a of allAdmins) {
    console.log(`  - ${a.email} (${a.name})`)
  }

  // Delete the old admin user (manager.mosa@alainproperties.ae)
  const oldAdmin = await prisma.adminUser.findUnique({ where: { email: 'manager.mosa@alainproperties.ae' } })
  if (oldAdmin) {
    await prisma.adminUser.delete({ where: { id: oldAdmin.id } })
    console.log(`\n✓ Deleted old admin: ${oldAdmin.email}`)
  }

  // Verify only the new admin remains
  const remaining = await prisma.adminUser.findMany()
  console.log(`\nRemaining admin users:`)
  for (const a of remaining) {
    console.log(`  - ${a.email} (${a.name})`)
  }
}

main().finally(async () => { await prisma.$disconnect() })
