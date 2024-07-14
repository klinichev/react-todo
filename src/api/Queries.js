export async function saveItemIntoStorage(key, value) {
    try {
        console.log(JSON.stringify(value));
        let response = await window.localStorage.setItem(key, JSON.stringify(value));
        return response;
    } catch (e) {
        console.log(e);
    }
}

export async function getItemFromStorage(key) {
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
        let response = await JSON.parse(window.localStorage.getItem(key));
        return response;
    } catch (e) {
        console.log(e);
    }
}