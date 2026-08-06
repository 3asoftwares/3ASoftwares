import Razorpay from 'razorpay';

export type RazorpayMode = 'test' | 'live';

const clients = new Map<RazorpayMode, Razorpay>();

function normalizeMode(mode?: string): RazorpayMode {
    return mode === 'live' ? 'live' : 'test';
}

export function isLocalHost(hostname = ''): boolean {
    return hostname.includes('localhost') || hostname.startsWith('127.') || hostname.endsWith('.local');
}

export function getRazorpayModeFromHost(hostname = ''): RazorpayMode {
    return isLocalHost(hostname.toLowerCase()) ? 'test' : 'live';
}

function getModeCredentials(mode: RazorpayMode = 'test'): { keyId?: string; keySecret?: string } {
    const normalizedMode = normalizeMode(mode);

    if (normalizedMode === 'live') {
        return {
            keyId: process.env.RAZORPAY_LIVE_KEY_ID,
            keySecret: process.env.RAZORPAY_LIVE_KEY_SECRET,
        };
    }

    return {
        keyId: process.env.RAZORPAY_TEST_KEY_ID,
        keySecret: process.env.RAZORPAY_TEST_KEY_SECRET,
    };
}

export function getRazorpayPublicKeyByMode(mode: RazorpayMode = 'test'): string | null {
    const normalizedMode = normalizeMode(mode);

    if (normalizedMode === 'live') {
        return process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY_ID || null;
    }

    return process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID || null;
}

export function getRazorpaySecretByMode(mode: RazorpayMode = 'test'): string | null {
    const { keySecret } = getModeCredentials(mode);
    return keySecret || null;
}

export function getAvailableRazorpaySecrets(): string[] {
    const set = new Set([process.env.RAZORPAY_TEST_KEY_SECRET, process.env.RAZORPAY_LIVE_KEY_SECRET]);

    return Array.from(set).filter((value): value is string => Boolean(value));
}

export function getRazorpayClient(mode: RazorpayMode = 'test'): Razorpay {
    const normalizedMode = normalizeMode(mode);

    const existing = clients.get(normalizedMode);
    if (existing) {
        return existing;
    }

    const { keyId, keySecret } = getModeCredentials(normalizedMode);

    if (!keyId || !keySecret) {
        const modeLabel = normalizedMode === 'live' ? 'live' : 'test';
        throw new Error(`Missing Razorpay ${modeLabel} credentials. Set RAZORPAY_${modeLabel.toUpperCase()}_KEY_ID and RAZORPAY_${modeLabel.toUpperCase()}_KEY_SECRET.`);
    }

    const client = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });

    clients.set(normalizedMode, client);
    return client;
}
