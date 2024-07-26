import { useEffect, useRef, useState } from 'react';
import { Button, Form } from './styles.js';

import * as mutations from '../../api/Tasks.js';
import { useQueryClient } from 'react-query';

const useFocus = () => {
    const htmlElRef = useRef(null);

    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus();
    }

    return [htmlElRef, setFocus];
}

export default function SimpleForm({ isActive, setActive }) {
    const queryClient = useQueryClient();

    const [value, setValue] = useState('');
    const [inputRef, setInputFocus] = useFocus();
    const { addNewTask } = mutations.useAddNewTask();

    useEffect(() => {
        if (isActive) setInputFocus();
    }, [isActive]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value !== '') {
            addNewTask(value, () => {
                queryClient.invalidateQueries('tasks');
                setActive(false);
            });
            setValue('');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <input ref={inputRef} type='text' placeholder='Введите название нового дела' value={value} onChange={(e) => setValue(e.target.value)} />
            <Button type='submit'>Добавить</Button>
        </Form>
    );
}