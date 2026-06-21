import 'dotenv/config';
import { prisma } from "./db.js";
import bcrypt from 'bcrypt'

async function main() {
    await prisma.user.deleteMany()
    const saltRounds = 10
    const password = "Coder123Ankit"
    const hash = await bcrypt.hash(password, saltRounds)
    const user = await prisma.user.create({
        data: {
            username: "Coder-Ankit001",
            password: hash,
            email: "ankitchaudhary1622@gmail.com"
        }
    });

    console.log("User successfully created:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });