import React, {Dispatch, SetStateAction} from "react";
import Button from "../Button";


type FormControl = { status: boolean, 'login': boolean, 'registration': boolean };
type SetFormControl = Dispatch<SetStateAction<FormControl>>;
type OrdersControl = boolean;
type SetOrdersControl = Dispatch<SetStateAction<OrdersControl>>;
type AuthStatus = boolean;
type SetAuthStatus = Dispatch<SetStateAction<AuthStatus>>;


interface MainPageProps {
    formControl: FormControl;
    setFormControl: SetFormControl;
    ordersControl: OrdersControl;
    setOrdersControl: SetOrdersControl;
    authStatus: AuthStatus;
    setAuthStatus: SetAuthStatus;
}

function MainPage({
                      formControl, setFormControl,
                      ordersControl, setOrdersControl,
                      authStatus, setAuthStatus,

                  }: MainPageProps) {
    return (
        <>

            <div style={{marginTop: '150px'}}>

                {!authStatus ?
                    <>
                        <Button
                            customClickEvent={() => setFormControl({
                                status: true,
                                'login': false,
                                'registration': true
                            })}
                            style={{width: '264px', color: 'rgba(0, 0, 0, 0.8)'}} content={'Registration'}/>
                        <Button
                            customClickEvent={() => setFormControl({
                                status: true,
                                'login': true,
                                'registration': false
                            })}
                            style={{width: '264px'}} content={'Login'}/>
                    </>
                    :
                    <h4 style={{textAlign: "center"}}>You are logged in</h4>

                }

                <Button customClickEvent={() => setOrdersControl(true)}
                        style={{width: '296px', fontWeight: 'bold', padding: '12px', marginTop: '40px'}}
                        content={'Orders'}/>
            </div>
        </>
    )
}

export default MainPage;