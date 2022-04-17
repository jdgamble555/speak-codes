import { getResources } from "@modules/resource";

export const get = async () => {
    return {
        body: await getResources()
    };
};
