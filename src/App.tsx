import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import MainPage from './components/views/MainPage';
import AuthForm from './components/views/Auth';
import OrdersPage from './components/views/OrdersPage';


interface formControl {
    status: boolean;
    login: boolean;
    registration: boolean;
}

function App() {
    const [formControl, setFormControl] = useState<formControl>({status: false, 'login': false, 'registration': false})
    const [ordersControl, setOrdersControl] = useState<boolean>(false)
    const [authStatus, setAuthStatus] = useState<boolean>(false)
    const [selectedCurrency, setSelectedCurrency] = useState<number>(0)
    const [selectedLanguage, setSelectedLanguage] = useState<number>(0)


    return (
        <div className="App">
            <Header
                authStatus={authStatus} setAuthStatus={setAuthStatus}
                selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency}
                selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}
            />
            {(!formControl.status && !ordersControl) && <MainPage
                formControl={formControl} setFormControl={setFormControl}
                ordersControl={ordersControl} setOrdersControl={setOrdersControl}
                authStatus={authStatus} setAuthStatus={setAuthStatus}

            />}
            {
                ordersControl && <OrdersPage ordersControl={ordersControl} setOrdersControl={setOrdersControl}/>
            }
            {
                formControl.status &&
                <AuthForm
                    formControl={formControl} setFormControl={setFormControl}
                    authStatus={authStatus} setAuthStatus={setAuthStatus}
                />
            }

        </div>
    );
}


export default App;
