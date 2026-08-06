import type { NextRequest } from 'next/server';

const memoryStore: Map<string, { count: number; expiresAt: number }> = global.rateLimitStore || new Map();

if (!global.rateLimitStore) {
    global.rateLimitStore = memoryStore;
}

export function getClientIp(request: NextRequest): string {
    return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export interface RateLimitOptions {
    key: string;
    limit?: number;
    windowMs?: number;
}

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    retryAfterMs?: number;
}

export function enforceRateLimit({ key, limit = 20, windowMs = 60_000 }: RateLimitOptions): RateLimitResult {
    const now = Date.now();
    const current = memoryStore.get(key);

    if (!current || current.expiresAt < now) {
        memoryStore.set(key, { count: 1, expiresAt: now + windowMs });
        return { allowed: true, remaining: limit - 1 };
    }

    if (current.count >= limit) {
        return { allowed: false, remaining: 0, retryAfterMs: current.expiresAt - now };
    }

    current.count += 1;
    memoryStore.set(key, current);
    return { allowed: true, remaining: limit - current.count };
}
