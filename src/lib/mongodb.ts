import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
const SERVER_SELECTION_TIMEOUT_MS = Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 10_000);

if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable');
}

type MongooseCache = { conn: Connection | null; promise: Promise<Connection> | null };

const cached: MongooseCache = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

export async function connectToDatabase(): Promise<Connection> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI as string, {
            bufferCommands: false,
            serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS,
        }).then((m) => m.connection);
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        // Reset the cached promise so next request can retry cleanly.
        cached.promise = null;

        const baseMessage = error instanceof Error ? error.message : 'Unknown MongoDB connection error';
        const isServerSelectionError = error instanceof Error && error.name === 'MongooseServerSelectionError';

        const details = isServerSelectionError
            ? 'Unable to reach MongoDB Atlas. Check Atlas IP Access List, cluster status, and connection string credentials.'
            : 'MongoDB connection failed.';

        const wrappedError = new Error(`${details} ${baseMessage}`);
        wrappedError.cause = error;
        throw wrappedError;
    }
}
