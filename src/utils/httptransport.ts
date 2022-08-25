import helpers from './helpers';

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

type Options = {
    method: string,
    timeout: number,
    data?: object,
    headers?: Record<string, string>
};

export default class HTTPTransport {
    get = (url: string, options: Options = {} as Options) => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    post = (url: string, options:Options = {} as Options) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    put = (url:string, options: Options = {} as Options) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    delete = (url:string, options: Options = {} as Options) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: Options = {} as Options, timeout: number = 5000) => {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('No method'));
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${helpers.queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data as XMLHttpRequestBodyInit);
            }
        });
    };
}
