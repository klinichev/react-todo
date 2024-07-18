import { useState } from 'react';
import { Button, CloseButton, DialogModal, DialogWrapper } from './styles.js';

export default function Dialog({ Content }) {
    const [isVisible, setVisible] = useState(false);

    const handleOpen = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Добавить дело</Button>
            <DialogWrapper onClick={handleClose} style={{ display: isVisible ? 'block' : 'none' }}>
                <DialogModal onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={handleClose}></CloseButton>
                    <Content isActive={isVisible} setActive={setVisible} />
                </DialogModal>
            </DialogWrapper>
        </div>
    );
}