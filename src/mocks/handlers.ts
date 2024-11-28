import { http, HttpResponse } from 'msw'
import { CARD_DATA } from './data/card-data';
import useSessionStorage from '../hooks/useSessionStorage';
import { APP_CONSTANTS } from '../constants/app-constant';

const { getStorageData } = useSessionStorage();

export const handlers = [
    // Intercept "GET" requests...
    http.get('https://api.com/data', () => {
        // ...and respond to them using this JSON response.
        const cardDataFromStorage = getStorageData(APP_CONSTANTS.cardDataStorage);
        if (cardDataFromStorage.length > 0) {
            return HttpResponse.json(cardDataFromStorage);
        }
        return HttpResponse.json(CARD_DATA);
    }),
    http.post('https://api.com/data', async ({ request }) => {
        const data = await request.json();
        return HttpResponse.json(data, { status: 200 });
    }),
]