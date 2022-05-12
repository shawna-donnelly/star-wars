import reactotron from 'reactotron-react-native';

export const fetchGQL = async (options: { query: string }) => {
    const { query } = options;

    let response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
        }),
    });
    let jsonResponse = await response.json();
    reactotron.log!(jsonResponse.data);
    return jsonResponse.data;
};
