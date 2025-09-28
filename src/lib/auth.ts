import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'adminToken';

function hmac(data: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

function expectedToken() {
  return process.env.ADMIN_SECRET || "change-me-please";
}

export async function setAdminCookie(): Promise<void> {
  const token = expectedToken();
  const store = await cookies();              // ← важно: await
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 дней
  });
}

export async function clearAdminCookie(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAdminAuthed(): Promise<boolean> {
  const store = await cookies();              // ← важно: await
  return store.get(COOKIE_NAME)?.value === expectedToken();
}

