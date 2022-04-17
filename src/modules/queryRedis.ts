export const queryRedis = async (vars: any, _fetch?: any,):
    Promise<{ props?: any, status?: string, error?: Error }> => {
    const fn = _fetch ? _fetch : fetch;
    const res = await fn('/db', {
        headers: { 'Content-type': 'application/json' },
        method: 'post',
        body: JSON.stringify(vars)
    });
    if (res.ok) {
        return {
            props: { data: await res.json() }
        };
    }
    return {
        status: res.status,
        error: new Error()
    };
};