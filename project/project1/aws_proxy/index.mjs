import https from 'https';

export const handler = async (event) => {
    const targetUrl = event.queryStringParameters && event.queryStringParameters.url;

    if (!targetUrl) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: 'Missing url query parameter' }),
        };
    }

    return new Promise((resolve, reject) => {
        https.get(targetUrl, (response) => {
            let body = '';

            // Collect response data
            response.on('data', (chunk) => {
                body += chunk;
            });

            response.on('end', () => {
                let parsedBody = {};

                try {
                    let contentType = response.headers['content-type'];
                    if (contentType && contentType.includes('application/json')) {
                        parsedBody = JSON.parse(body);
                    } else {
                        parsedBody = body; 
                    }
                } catch (error) {
                    reject({ message: 'Failed to parse response as JSON' });
                    return;
                }

                resolve(parsedBody);
            });
        }).on('error', (err) => {
            reject({
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify({ message: 'Error fetching data' }),
            });
        });
    });
};