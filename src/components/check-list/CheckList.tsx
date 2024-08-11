import React from 'react';
import { useQueryClient } from 'react-query';

import * as mutations from '../../api/Tasks.ts';

import { Ul, Li } from './styles.tsx';

type Item = {
    value: string;
    isDone: boolean;
    key: number;
}

interface checkListProps {
    items: Item[];
}

interface changeParams {
    key: number;
    newValue: boolean;
}

export default function CheckList({ items }: checkListProps) {
    const queryClient = useQueryClient();

    const { checkTask } = mutations.useCheckTask();

    const onChangeIsChecked = (params: changeParams) => {
        checkTask(params, () => {
            console.log('checked');
            queryClient.invalidateQueries('tasks');
        });
    }

    const itemsList = items.map((item) => {
        const key = item.key;
        return (
            <CheckItem value={item.value} isChecked={item.isDone} key={key} 
                        onChange={(newValue: boolean) => onChangeIsChecked({ key, newValue })} />
        );
    });

    return (
        <>
            <Ul>{itemsList}</Ul>
        </>
    );
}

function CheckItem({ value, isChecked, onChange }) {
    return (
        <>
            <Li>
                <input type="checkbox" checked={isChecked} onChange={(event) => onChange(event.target.checked)} />
                <div>{value}</div>
            </Li>
        </>
    );
}