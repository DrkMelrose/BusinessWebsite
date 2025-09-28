import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function createService(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "");
  const priceCents = Number(formData.get("priceCents") || 0) || null;
  const description = String(formData.get("description") || "");
  const featured = formData.get("featured") === "on";
  await prisma.service.create({ data: { title, slug, priceCents, description, featured } });
  revalidatePath("/services");
}

async function deleteService(id: number) {
  "use server";
  await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
}

export default async function AdminServices() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Услуги</h1>

      <form action={createService} className="card grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Название</label>
          <input className="input" name="title" required />
        </div>
        <div>
          <label className="label">Slug (URL)</label>
          <input className="input" name="slug" placeholder="site-vizitka" required />
        </div>
        <div>
          <label className="label">Цена, евро (целое число)</label>
          <input className="input" name="priceCents" type="number" placeholder="499" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Описание</label>
          <textarea className="input min-h-24" name="description"></textarea>
        </div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="featured" />
          <span>Выводить на главной</span>
        </label>
        <div className="sm:col-span-2">
          <button className="btn-primary btn" type="submit">Добавить</button>
        </div>
      </form>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Slug</th>
              <th>Цена</th>
              <th>Избранное</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.title}</td>
                <td>{s.slug}</td>
                <td>{s.priceCents ? (s.priceCents/100).toFixed(0) : "—"}</td>
                <td>{s.featured ? "✓" : "—"}</td>
                <td>
                  <form action={deleteService.bind(null, s.id)}>
                    <button className="btn" type="submit">Удалить</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
