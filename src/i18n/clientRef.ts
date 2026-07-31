import type { i18n } from "i18next";

let clientI18n: i18n | undefined;

export function setClientI18n(instance: i18n): void {
  clientI18n = instance;
}

export function getClientI18n(): i18n | undefined {
  return clientI18n;
}

export function clientTranslate(
  key: string,
  options?: Record<string, unknown>,
): string {
  return clientI18n?.t(key, options) ?? key;
}
