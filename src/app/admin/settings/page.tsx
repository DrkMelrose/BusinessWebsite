import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function saveSettings(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const phone = String(formData.get("phone") || "");
  const email = String(formData.get("email") || "");
  const address = String(formData.get("address") || "");
  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: { title, description, phone, email, address },
    create: { id: 1, title, description, phone, email, address }
  });
  revalidatePath("/");
}

export default async function SettingsPage() {
  const s = await prisma.siteSetting.findUnique({ where: { id: 1 } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Настройки сайта</h1>
      <form action={saveSettings} className="card grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Название</label>
          <input className="input" name="title" defaultValue={s?.title || ""} required />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Описание</label>
          <textarea className="input min-h-24" name="description" defaultValue={s?.description || ""}></textarea>
        </div>
        <div>
          <label className="label">Телефон</label>
          <input className="input" name="phone" defaultValue={s?.phone || ""} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" name="email" defaultValue={s?.email || ""} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Адрес</label>
          <input className="input" name="address" defaultValue={s?.address || ""} />
        </div>
        <div className="sm:col-span-2">
          <button className="btn-primary btn" type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  );
}
