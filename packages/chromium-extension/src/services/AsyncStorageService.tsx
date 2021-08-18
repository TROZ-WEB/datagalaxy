export interface StorageData {
    [key: string]: any;
}

class AsyncStorageService {
    static async setData(items: StorageData): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                chrome.storage.local.set(items);
                resolve(undefined);
            } catch (error) {
                console.error(error);
                reject();
            }
        });
    }

    static async getData(item: string): Promise<StorageData> {
        return new Promise((resolve, reject) => {
            try {
                chrome.storage.local.get(item, (returnedItems) => {
                    resolve(returnedItems);
                });
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }
}

export default AsyncStorageService;
