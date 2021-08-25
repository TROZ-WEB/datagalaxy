/**
 * Custom Persist for chrome.storage.local API.
 *
 * (https://easy-peasy.vercel.app/docs/api/persist.html#custom-storage-engines)
 */

const setItem = async (key: string, value: any): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            console.info('je devrais passer là pour : ', key, value);
            chrome.storage.local.set({ [key]: value });
            resolve(undefined);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
};

const getItem = async (item: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(item, (returnedItems) => {
                console.info('je getItem : ', item, ' => ', returnedItems);
                resolve(returnedItems[item]);
            });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

const removeItem = async (key: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.remove(key);
            resolve(undefined);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
};

export default { setItem, getItem, removeItem };
