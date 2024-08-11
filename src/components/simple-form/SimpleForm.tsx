import React, { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Button, Form } from './styles.tsx';

import * as mutations from '../../api/Tasks.ts';
import { useQueryClient } from 'react-query';

const useFocus = () => {
    const htmlElRef = useRef<HTMLInputElement>(null);

    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus();
    }

    return [htmlElRef, setFocus] as const;
}

interface simpleFormProps {
    isActive: boolean;
    setActive: (arg0: boolean) => void;
}

export default function SimpleForm({ isActive, setActive }: simpleFormProps) {
    const queryClient = useQueryClient();

    const [value, setValue] = useState('');
    const [inputRef, setInputFocus] = useFocus();
    const { addNewTask } = mutations.useAddNewTask();

    useEffect(() => {
        if (isActive) setInputFocus();
    }, [isActive]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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