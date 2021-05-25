export async function sendRequest(method, address, body) {
    const response = await fetch(address, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
    });
    return response.json(); // parses JSON response into native JavaScript objects
}