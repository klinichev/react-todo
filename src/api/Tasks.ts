import { useMutation, useQuery } from 'react-query';
import * as api from './Queries.ts';

export const useTasks = () => {
    return useQuery('tasks', () => api.getItemFromStorage('tasks'));
};

export const useMutateData = () => {
    return useMutation((newArray: any[]) => api.saveItemIntoStorage('tasks', newArray));
};

export const useAddNewTask = () => {
    const { data } = useTasks();
    const { mutate } = useMutateData();

    const addNewTask = (value: string, onSuccess: () => void) => {
        if (Array.isArray(data)) {
            let newKey = data[data.length - 1].key + 1;
            const arrayToChange = [...data, {
                'value': value,
                'isDone': false,
                'key': newKey
            }];
            mutate(arrayToChange, { onSuccess });
        }
    }

    return { addNewTask };
};

export const useCheckTask = () => {
    const { data } = useTasks();
    const { mutate } = useMutateData();

    interface changeParams {
        key: number;
        newValue: boolean;
    }

    const checkTask = ({ key, newValue }: changeParams, onSuccess: () => void) => {
        if (Array.isArray(data)) {
            const arrayToChange = data.map((item) => {
                if (item.key === key) {
                    return { ...item, isDone: newValue };
                }
                return item;
            });
            mutate(arrayToChange, { onSuccess });
        }
    }

    return { checkTask };
}