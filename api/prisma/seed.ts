import { prisma } from "../src/configs/batabase";

async function main() {
  await prisma.cep.createMany({
    data: [
      { cep: "12345678", address: "Rua Exemplo, 123" },
      { cep: "87654321", address: "Avenida Teste, 321" },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
