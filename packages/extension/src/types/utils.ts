export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function safeGetString(data: unknown, key: string): string | undefined {
  if (isRecord(data)) {
    const value = data[key];
    if (typeof value === "string") {
      return value;
    }
  }
  return undefined;
}

export function safeGetNumber(data: unknown, key: string): number | undefined {
  if (isRecord(data)) {
    const value = data[key];
    if (typeof value === "number") {
      return value;
    }
  }
  return undefined;
}
