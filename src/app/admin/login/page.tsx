import { redirect } from "next/navigation";
import { setAdminCookie, isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

//  Promise
type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLogin({ searchParams }: Props) {
  // уже авторизован? — сразу в админку
  if (await isAdminAuthed()) redirect("/admin");

  const sp = (await searchParams) ?? {};
  const redirectTo = typeof sp.redirect === "string" ? sp.redirect : "/admin";
  const hasError = sp.err === "1";

  // Server Action: ничего не возвращаем, только редиректим
  async function loginAction(formData: FormData): Promise<void> {
    "use server";
    const pass = formData.get("password")?.toString() || "";
    const expected = process.env.ADMIN_PASSWORD || "change-me-please";
    const to = formData.get("redirect")?.toString() || redirectTo;

    if (pass === expected) {
      await setAdminCookie();
      redirect(to); // успех — редирект, функция не возвращается
    }
    // ошибка — редиректим назад с флагом
    redirect(`/admin/login?err=1&redirect=${encodeURIComponent(to)}`);
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-2xl font-semibold mb-4">Вход в админ-панель</h1>
      <form action={loginAction} className="card space-y-4">
        <input type="hidden" name="redirect" value={redirectTo} />
        <div>
          <label className="label">Пароль администратора</label>
          <input className="input" type="password" name="password" required />
        </div>
        <button className="btn-primary btn" type="submit">Войти</button>
        {hasError ? <p className="text-sm text-red-600">Неверный пароль</p> : null}
      </form>
      <p className="mt-4 text-sm text-gray-500">
        Пароль хранится в переменной окружения <code>ADMIN_PASSWORD</code>. Поменяйте его!
      </p>
    </div>
  );
}
