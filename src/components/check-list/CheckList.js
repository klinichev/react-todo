import { Ul, Li } from './styles.js';

export default function CheckList({ items, onChangeIsChecked, isCheckedKeyName }) {
    const itemsList = items.map((item, index) => {
        const isChecked = item[isCheckedKeyName];
        const key = item.key;
        return (
            <CheckItem value={item.value} isChecked={isChecked} key={key} onChange={(newValue) => onChangeIsChecked({ key, newValue })} />
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