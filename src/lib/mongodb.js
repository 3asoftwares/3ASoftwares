import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;
const SERVER_SELECTION_TIMEOUT_MS = Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 10_000);

if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI (or DATABASE_URL) environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS,
        });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        // Reset the cached promise so next request can retry cleanly.
        cached.promise = null;

        const baseMessage = error?.message || 'Unknown MongoDB connection error';
        const isServerSelectionError = error?.name === 'MongooseServerSelectionError';

        const details = isServerSelectionError
            ? 'Unable to reach MongoDB Atlas. Check Atlas IP Access List, cluster status, and connection string credentials.'
            : 'MongoDB connection failed.';

        const wrappedError = new Error(`${details} ${baseMessage}`);
        wrappedError.cause = error;
        throw wrappedError;
    }
}
