import "./../styles/globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Biz Starter",
  description: "Быстрый шаблон сайта для малого бизнеса на Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="text-lg font-semibold">Small Biz Starter</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/services" className="hover:underline">Услуги</Link>
              <Link href="/contact" className="hover:underline">Контакты</Link>
              <Link href="/admin" className="badge">Админ</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="border-t py-8 mt-16">
          <div className="container text-sm text-gray-500">
            © {new Date().getFullYear()} Small Biz Starter
          </div>
        </footer>
      </body>
    </html>
  );
}
