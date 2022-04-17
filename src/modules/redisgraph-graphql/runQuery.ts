import { addUser, getUser, queryUsers } from "./user";

// manually declare all your methods here for security

export const runQuery = async (q: any) => {

    if (q.method === 'query') {
        if (q.type === 'User') {
            if (q?.filter?.id || q?.filter?.email) {
                return await getUser(q);
            }
            return await queryUsers(q?.fields);
        }
    }
    if (q.method === 'add') {
        if (q.type === 'User') {
            if (q?.data?.email) {
                return await addUser(q.data);
            }
        }
    }
};