import { API_BASE } from "./api";

export const ADMIN_KEY_STORAGE = "slsweep_admin_key";

export function getAdminKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ADMIN_KEY_STORAGE) || "";
}

export function setAdminKey(key: string) {
  localStorage.setItem(ADMIN_KEY_STORAGE, key);
}

export function clearAdminKey() {
  localStorage.removeItem(ADMIN_KEY_STORAGE);
}

export function isLoggedIn(): boolean {
  return Boolean(getAdminKey());
}

export async function loginWithKey(key: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: key.trim() }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Login failed");
  }

  setAdminKey(key.trim());
}

export async function verifyAdminSession(): Promise<boolean> {
  const key = getAdminKey();
  if (!key) return false;

  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { "x-admin-key": key },
      cache: "no-store",
    });
    if (!res.ok) {
      clearAdminKey();
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function logout() {
  clearAdminKey();
}
