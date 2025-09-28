import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3
  });
  const testimonials = await prisma.testimonial.findMany({ take: 3 });

  return (
    <div className="space-y-10">
      <section className="card">
        <h1 className="text-3xl font-bold">{settings?.title ?? "Ваш бизнес онлайн"}</h1>
        <p className="mt-2 text-gray-600">{settings?.description ?? "Сайты, которые приносят заявки."}</p>
        <div className="mt-4 flex gap-3">
          <Link className="btn-primary btn" href="/contact">Оставить заявку</Link>
          <Link className="btn" href="/services">Посмотреть услуги</Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Популярные услуги</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map(s => (
            <div key={s.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="text-gray-600">{s.description}</p>
                </div>
                {s.priceCents ? <span className="badge">{(s.priceCents/100).toFixed(0)} €</span> : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Отзывы</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {testimonials.map(t => (
            <div key={t.id} className="card">
              <p className="text-gray-800">“{t.text}”</p>
              <p className="mt-2 text-sm text-gray-500">— {t.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
