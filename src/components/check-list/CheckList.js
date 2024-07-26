import { useQueryClient } from 'react-query';

import * as mutations from '../../api/Tasks.js';

import { Ul, Li } from './styles.js';

export default function CheckList({ items }) {
    const queryClient = useQueryClient();

    const { checkTask } = mutations.useCheckTask();

    const onChangeIsChecked = (params) => {
        checkTask(params, () => {
            console.log('checked');
            queryClient.invalidateQueries('tasks');
        });
    }

    const itemsList = items.map((item, index) => {
        const key = item.key;
        return (
            <CheckItem value={item.value} isChecked={item.isDone} key={key} 
                        onChange={(newValue) => onChangeIsChecked({ key, newValue })} />
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