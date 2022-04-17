import { createClient } from "redis";

let process: any;

const p = process?.env ? process.env : import.meta.env;

const client = createClient({ url: p.VITE_REDIS_URL });

if (!client.isOpen) {
    client.connect();
}

export const graphQuery = (q: string, vars?: any) => client.graph.query('speak-codes', q, vars);

