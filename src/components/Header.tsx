import React, {Dispatch, SetStateAction} from "react";
import Dropdown from "./Dropdown";
import engIcon from '../img/eng.svg'
import uaIcon from '../img/ua.svg'

type AuthStatus = boolean;
type SetAuthStatus = Dispatch<SetStateAction<AuthStatus>>;
type SelectedCurrency = number;
type SetSelectedCurrency = Dispatch<SetStateAction<SelectedCurrency>>;
type SelectedLanguage = number;
type SetSelectedLanguage = Dispatch<SetStateAction<SelectedLanguage>>;


interface Props {
    authStatus: AuthStatus;
    setAuthStatus: SetAuthStatus;
    selectedCurrency: SelectedCurrency
    setSelectedCurrency: SetSelectedCurrency
    selectedLanguage: SelectedLanguage
    setSelectedLanguage: SetSelectedLanguage
}

const languages = [
    {code: 'EN', enum: 0, icon: 'eng'},
    {code: 'UA', enum: 1, icon: 'ua'},
    {code: 'UA', enum: 2, icon: 'ua'}]
const currencies = [
    {code: 'USD', enum: 0},
    {code: 'UAH', enum: 1},
    {code: 'EUR', enum: 2}]

function Header({
                    authStatus,
                    setAuthStatus,
                    selectedCurrency,
                    setSelectedCurrency,
                    selectedLanguage,
                    setSelectedLanguage
                }: Props) {
    return (


        <header className="App-header">

            <div className="authorization__display">{authStatus ? "👤✅" : "👤❌"}</div>
            <nav>

                <Dropdown options={currencies} selected={selectedCurrency}
                          setSelected={setSelectedCurrency}></Dropdown>

                <Dropdown options={languages} selected={selectedLanguage}
                          setSelected={setSelectedLanguage}></Dropdown>

                <div className="current__language"><img
                    src={languages[selectedLanguage].icon === 'eng' ? engIcon : uaIcon} width={20} height={20} alt=''/>
                </div>


            </nav>
        </header>
    )
}

export default Header;