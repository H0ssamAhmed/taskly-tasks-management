import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants/CookieStrings";

export function setCookie(name: string, value: string, days?: number): void {
  const expires = "; expires=" + days;
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=Lax";
}

export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function removeCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export const getAccessToken = (): string | null => {
  return getCookie(ACCESS_TOKEN_KEY);
};

export const getREFRESH_TOKEN_KEY = (): string | null => {
  return getCookie(REFRESH_TOKEN_KEY);
};

export const removeTokens = (): void => {
  removeCookie(ACCESS_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
};
