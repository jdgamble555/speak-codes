import json5 from "json5";

import { createQuery } from "./createQuery";
import { graphQuery } from "./redis";
import { filter_fields, jsonify } from "./utils";

// add constraints here


export const addUser = async (data: any) => {
    const newData = {
        email: data.email,
        displayName: data.displayName,
        fbid: data.uid,
        photoURL: data.photoURL
    };
    const q = createQuery({
        cmd: 'upsert',
        filter: { email: data.email },
        type: 'User',
        data: newData
    });
    const r = await graphQuery(q);
    return jsonify(r.data);
};

export const queryUsers = async (fields?: any) => {
    const q = createQuery({ cmd: 'query', type: 'User', fields });
    const r = await graphQuery(q);
    return r;
    //return jsonify(r.data);
};

export const getUser = async (q: any) => {

    let filter: any;
    if (q.filter.id) {
        filter = { id: q.filter.id };
    } else if (q.filter.email) {
        filter = { email: q.filter.email };
    }
    const _q = createQuery({ cmd: 'query', type: 'User', filter, limit: 1 });
    const r = await graphQuery(_q);
    console.log(r);
    return JSON.parse(r.data as any);
};

export const deleteUser = async (filter: any) => {

    const q = createQuery({ cmd: 'delete', type: 'User', filter });
    const r = await graphQuery(q);
    return jsonify(r.data);
};

export const updateUser = async (id: string) => {


};


