import { prisma } from "@/lib/prisma";

async function markSeen(id: number) {
  "use server";
  await prisma.lead.update({ where: { id }, data: { seen: true } });
}

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  if (!leads.length) return <p>Пока нет заявок.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Заявки</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Сообщение</th>
            <th>Создано</th>
            <th>Статус</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td className="max-w-md">{lead.message}</td>
              <td>{lead.createdAt.toISOString().slice(0,16).replace('T',' ')}</td>
              <td>{lead.seen ? "Просмотрено" : "Новое"}</td>
              <td>
                {!lead.seen ? (
                  <form action={markSeen.bind(null, lead.id)}>
                    <button className="btn" type="submit">Отметить</button>
                  </form>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
