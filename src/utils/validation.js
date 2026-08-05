export function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

export function isEmail(value) {
    return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPhone(value) {
    return typeof value === 'string' && /^\+?[0-9\s-]{8,15}$/.test(value.trim());
}
