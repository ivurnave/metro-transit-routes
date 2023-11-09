
export default class HttpService {

    static async get<T>(url: string): Promise<T> {
        const responsePromise = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });
        return responsePromise.json();
    }

}