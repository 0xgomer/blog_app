import {FC} from "react";
import './tabs.scss'

export interface TabsValues{
    title: string,
    value: string
}

export interface TabsProps {
    values: Array<TabsValues>
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

const Tabs:FC<TabsProps> = ({values, selected, setSelected}) => {
    return (
        <ul className={'tabs'}>
            {values.map(value => <li key={value.value} className={selected === value.value ? 'active' : ''} onClick={() => setSelected(value.value)}><span>{value.title}</span></li>)}
        </ul>
    );
};

export default Tabs;