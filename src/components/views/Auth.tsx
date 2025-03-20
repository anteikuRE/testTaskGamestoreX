import closeIcon from "../../img/Vector.svg";
import Button from "../Button";
import google from "../../img/google.svg";
import React, {Dispatch, SetStateAction} from "react";

type FormControl = { status: boolean, 'login': boolean, 'registration': boolean };
type SetFormControl = Dispatch<SetStateAction<FormControl>>;
type AuthStatus = boolean;
type SetAuthStatus = Dispatch<SetStateAction<AuthStatus>>;

interface Props {
    formControl: FormControl;
    setFormControl: SetFormControl;
    authStatus: AuthStatus;
    setAuthStatus: SetAuthStatus;
}


function AuthForm({formControl, setFormControl, authStatus, setAuthStatus}: Props) {


    return (
        <>
            <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                top: '-9%',
                backdropFilter: 'blur(10px)'
            }}>
                <div className="auth__wrapper">
                    <div className="auth__navigation">
                        <div className="auth__switch">
                            <button onClick={() => setFormControl({
                                status: true,
                                'login': true,
                                'registration': false
                            })}
                                    className={(formControl.login ? 'active' : '')}>Login
                            </button>
                            <button onClick={() => setFormControl({
                                status: true,
                                'login': false,
                                'registration': true
                            })}
                                    className={(formControl.registration ? 'active' : '')}>Registration
                            </button>
                        </div>
                        <img
                            style={{cursor: "pointer"}}
                            onClick={() => setFormControl({status: false, 'login': false, 'registration': false})}
                            className="auth__close" src={closeIcon} alt=""/>
                    </div>

                    {
                        formControl.registration ?
                            <Form setAuthStatus={setAuthStatus} setFormControl={setFormControl}>
                                <input required={true} minLength={3} type="text" placeholder={'Email or Mobile'}/>
                                <input required={true} minLength={8} type="text" placeholder={'Password'}/>
                                <input required={true} minLength={8} type="text" placeholder={'Confirm Password'}/>
                                <div style={{marginTop: '24px', display: 'flex', alignItems: 'center'}}>
                                    <input required={true} type="checkbox" name="social" id=""/>
                                    <label style={{marginLeft: '8px', opacity: '50%', fontSize: '12px'}}
                                           htmlFor="social">Use social networks</label>
                                </div>
                                <Button

                                    style={{width: '264px', color: 'rgba(0, 0, 0, 0.8)', marginTop: '24px'}}
                                    content={'Registration'}/>
                            </Form>
                            :
                            <Form setAuthStatus={setAuthStatus} setFormControl={setFormControl}>
                                <input required={true} type="text" placeholder={'Email'}/>
                                <input required={true} type="text" placeholder={'Password'}/>

                                <Button
                                    style={{width: '264px', color: 'rgba(0, 0, 0, 0.8)'}} content={'Login'}/>
                            </Form>
                    }
                    <div className="auth__social-links">
                        <h4 style={{textAlign: 'center', marginBottom: '12px', fontSize: '12px'}}>Use social
                            networks</h4>
                        <div className="auth__social__icons">
                            <img src={google} alt=""/>
                            <img src={google} alt=""/>
                            <img src={google} alt=""/>
                            <img src={google} alt=""/>
                            <img src={google} alt=""/>
                        </div>
                    </div>
                    {
                        formControl.login && <h4 style={{

                            textAlign: 'center',
                            color: 'rgba(255, 255, 255, 0.4)',
                            textDecoration: 'underline',
                            marginBottom: '12px',
                            fontSize: '12px'
                        }}>Forgot password ?</h4>}
                </div>
            </div>
        </>
    )
}

function Form({children, setAuthStatus, setFormControl}: any) {
    function SubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setAuthStatus(true)
        setFormControl({status: false, 'login': false, 'registration': false})

    }

    return (
        <form className={'auth__form'} onSubmit={(e) => SubmitForm(e)}>{children}</form>
    )
}

export default AuthForm;