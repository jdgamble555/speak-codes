
/*
: return cypher values as JSON
*/
export const jsonify = (x: any) => {
    const arrayToJSON = (x: any, type: string, id: string) =>
        x.reduce((p: any, c: any) => ({ ...p, [c[0]]: c[1] }), { __typename: type, id });
    const getProps = (x: any) => arrayToJSON(x[2][1], x[1][1][0], x[0][1]);
    return x.map((s: any) => getProps(s[0]));
};

/*
: JSON stringify without key quotes
*/
export const json_stringify = (j: any) =>
    JSON.stringify(j).replace(/\\/g, "").replace(/"(\w+)":"/g, "$1: \"").replace(/,/g, ", ");

/*
: filter out fiels
*/
export const filter_fields = (obj: any, fields: string[]) => obj.map((_r: any) => {
    Object.keys(_r).map((f: string) => {
        if (!(f in fields) && f !== '__typename') {
            delete _r[f];
        }
    });
    return _r;
});
