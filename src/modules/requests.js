export async function sendRequest(method, address, body) {
    const response = await fetch(address, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: body
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function getRequest(address) {
    const response = await fetch(address, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    });
    return response.json(); // parses JSON response into native JavaScript objects
}