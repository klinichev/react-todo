function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function saveItemIntoStorage(key: string, value: any) {
    try {
        console.log(JSON.stringify(value));
        let response = window.localStorage.setItem(key, JSON.stringify(value));
        await timeout(1000);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function getItemFromStorage(key: string) {
    try {
        // return [{
        //   'value': 'Delo 1',
        //   'isDone': false,
        //   'key': 0
        // }, {
        //   'value': 'Delo 2',
        //   'isDone': false,
        //   'key': 1
        // }];
        let response = await window.localStorage.getItem(key) || '{}';
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
    }
}