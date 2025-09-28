import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Musterfirma Bonn",
      description: "Сайты для малого бизнеса: быстро, удобно, прибыльно.",
      phone: "+49 228 123456",
      email: "info@example.com",
      address: "Am Beispielweg 1, 53111 Bonn"
    }
  });

  await prisma.service.createMany({
    data: [
      { title: "Сайт-визитка", slug: "site-vizitka", priceCents: 49900, description: "1–3 страницы, контактная форма, SEO-основа." },
      { title: "Малый e‑Commerce", slug: "mini-shop", priceCents: 129900, description: "Каталог, корзина, платежи через Stripe." },
      { title: "Редизайн + SEO", slug: "redesign-seo", priceCents: 79900, description: "Миграция, Core Web Vitals, локальное SEO." }
    ],
    skipDuplicates: true
  });

  await prisma.testimonial.createMany({
    data: [
      { author: "Анна, салон красоты", text: "Стало больше онлайн-заявок, записи через сайт теперь удобные." },
      { author: "Михаэль, сантехника", text: "Скорость загрузки топ, на мобильном всё понятно. Рекомендую!" }
    ]
  });

  console.log("Seed done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
