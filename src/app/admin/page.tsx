import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminHome() {
  const leadsCount = await prisma.lead.count({ where: { seen: false } });
  const servicesCount = await prisma.service.count();
  const settings = await prisma.siteSetting.findUnique({ where: { id: 1 } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Админ-панель</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <div className="text-sm text-gray-500">Непрочитанные заявки</div>
          <div className="text-3xl font-bold">{leadsCount}</div>
          <Link className="btn mt-3" href="/admin/leads">Перейти</Link>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500">Услуги</div>
          <div className="text-3xl font-bold">{servicesCount}</div>
          <Link className="btn mt-3" href="/admin/services">Управление</Link>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500">Настройки сайта</div>
          <div className="text-lg font-semibold">{settings?.title ?? "—"}</div>
          <Link className="btn mt-3" href="/admin/settings">Открыть</Link>
        </div>
      </div>
    </div>
  );
}
