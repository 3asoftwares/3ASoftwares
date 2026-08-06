export function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
}

export function isEmail(value: unknown): value is string {
    return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPhone(value: unknown): value is string {
    return typeof value === 'string' && /^\+?[0-9\s-]{8,15}$/.test(value.trim());
}
