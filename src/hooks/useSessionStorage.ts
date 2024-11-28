// hook for session storage operations

import { CardData } from "../models/card";

const useSessionStorage = () => {

    const getStorageData = (key: string) => {
        return JSON.parse(sessionStorage.getItem(key) || '[]');
    }

    const saveStorageData = (key: string, updatedValue: CardData[]) => {
        sessionStorage.setItem(key, JSON.stringify(updatedValue));
    }

    return { getStorageData, saveStorageData };
}

export default useSessionStorage;