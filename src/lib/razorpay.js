import Razorpay from 'razorpay';

const clients = new Map();

function normalizeMode(mode) {
    return mode === 'live' ? 'live' : 'test';
}

export function isLocalHost(hostname = '') {
    return hostname.includes('localhost') || hostname.startsWith('127.') || hostname.endsWith('.local');
}

export function getRazorpayModeFromHost(hostname = '') {
    return isLocalHost(hostname.toLowerCase()) ? 'test' : 'live';
}

function getModeCredentials(mode = 'test') {
    const normalizedMode = normalizeMode(mode);

    if (normalizedMode === 'live') {
        return {
            keyId: process.env.RAZORPAY_LIVE_KEY_ID || process.env.RAZORPAY_KEY_ID,
            keySecret: process.env.RAZORPAY_LIVE_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET,
        };
    }

    return {
        keyId: process.env.RAZORPAY_TEST_KEY_ID || process.env.RAZORPAY_KEY_ID,
        keySecret: process.env.RAZORPAY_TEST_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET,
    };
}

export function getRazorpayPublicKeyByMode(mode = 'test') {
    const normalizedMode = normalizeMode(mode);

    if (normalizedMode === 'live') {
        return process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || null;
    }

    return process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || null;
}

export function getRazorpaySecretByMode(mode = 'test') {
    const { keySecret } = getModeCredentials(mode);
    return keySecret || null;
}

export function getAvailableRazorpaySecrets() {
    const set = new Set([
        process.env.RAZORPAY_TEST_KEY_SECRET,
        process.env.RAZORPAY_LIVE_KEY_SECRET,
        process.env.RAZORPAY_KEY_SECRET,
    ]);

    return Array.from(set).filter(Boolean);
}

export function getRazorpayClient(mode = 'test') {
    const normalizedMode = normalizeMode(mode);

    if (clients.has(normalizedMode)) {
        return clients.get(normalizedMode);
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
