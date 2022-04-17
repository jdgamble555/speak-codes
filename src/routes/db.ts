import { runQuery } from "@home/modules/redisgraph-graphql/runQuery";

export const post = async ({ request }: { request: any }) => {

    const data = await request.json();

    const r = await runQuery(data);

    if (r) {
        return {
            body: r
        };
    }
    return {
        status: 404
    };
};