import currencyIcon from '../img/fi_10432252.svg'
import {Dispatch, SetStateAction, useState} from "react";
import engIcon from '../img/eng.svg'
import uaIcon from '../img/ua.svg'

type Selected = number;
type SetSelected = Dispatch<SetStateAction<Selected>>;

interface Options {
    code: string,
    enum: number,
    icon?: string
}

interface Props {
    options: Options[]
    selected: Selected
    setSelected: SetSelected
}

function Dropdown({selected, setSelected, options}: Props) {


    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
        <div onMouseEnter={() => setIsOpen(false)} onMouseLeave={() => setIsOpen(true)}
             className={'header__selector__wrapper'}>
            <div className={'header__selector'}><img
                src={options[selected].icon ? options[selected].icon === 'eng' ? engIcon : uaIcon : currencyIcon}
                alt=""/><span>{options[selected].code}</span>
            </div>


            <div style={isOpen ? {display: 'none'} : {}} className={'header__selector__options'}>
                {
                    options.map((option) => <div onClick={() => setSelected(option.enum)}
                                                 className={`${selected === option.enum ? 'active' : ''} header__selector__option`}>
                            <img src={option.icon ? option.icon === 'eng' ? engIcon : uaIcon : currencyIcon}
                                 alt=""/>
                            <span>{option.code}</span>
                        </div>
                    )
                }
            </div>


        </div>

    )
}

export default Dropdown;