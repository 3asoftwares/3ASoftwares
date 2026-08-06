import type { Connection } from 'mongoose';

export interface RazorpayCheckoutOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    order_id: string;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
        color?: string;
    };
    modal?: {
        ondismiss?: () => void;
    };
    handler?: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
}

export interface RazorpayFailureResponse {
    error?: {
        description?: string;
        reason?: string;
        metadata?: {
            payment_id?: string;
        };
    };
}

export interface RazorpayInstance {
    open: () => void;
    on: (event: 'payment.failed', handler: (response: RazorpayFailureResponse) => void) => void;
}

export interface RazorpayConstructor {
    new (options: RazorpayCheckoutOptions): RazorpayInstance;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: { conn: Connection | null; promise: Promise<Connection> | null } | undefined;
    // eslint-disable-next-line no-var
    var rateLimitStore: Map<string, { count: number; expiresAt: number }> | undefined;

    interface Window {
        Razorpay: RazorpayConstructor;
    }
}

export {};
