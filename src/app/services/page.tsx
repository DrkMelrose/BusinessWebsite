import { prisma } from "@/lib/prisma";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }]
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Услуги</h1>
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
    </div>
  );
}
