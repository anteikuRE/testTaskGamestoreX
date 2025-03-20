import backArrow from '../../img/backArrow.svg'
import cross from '../../img/cross.svg'
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Button from "../Button";

type OrdersControl = boolean;
type SetOrdersControl = Dispatch<SetStateAction<OrdersControl>>;

interface Props {

    ordersControl: OrdersControl;
    setOrdersControl: SetOrdersControl;

}

type OrderOpen = boolean;
type SetOrderOpen = Dispatch<SetStateAction<OrderOpen>>;
type OpenOrderId = number;
type SetOpenOrderId = Dispatch<SetStateAction<OpenOrderId>>;

interface PropsOrder {
    orderOpen: OrderOpen;
    setOrderOpen: SetOrderOpen;
    openOrderId?: OpenOrderId;
    setOpenOrderId?: SetOpenOrderId;
}

type Data = {
    "Transaction ID": number,
    "Date": string,
    "Status": string,
    "Game Name": string,
    "Game ID": number,
    "Ammount": string
};

type OrderCardProps = PropsOrder & { data?: Data };

function OrdersPage({setOrdersControl, ordersControl}: Props) {
    const [orderOpen, setOrderOpen] = useState<boolean>(false)
    const [openOrderId, setOpenOrderId] = useState<number>(0)
    const [data, setData] = useState<Data[] | null>(null);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(result => setData(result))
            // .then(result => console.log(result))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>


            {
                !orderOpen ?
                    <div className="orders__wrapper" style={{margin: '12px 12px 0 12px'}}>

                        <div style={{display: 'flex'}}>
                            <img onClick={() => setOrdersControl(false)} style={{cursor: 'pointer'}} src={backArrow}
                                 alt=""/>
                            <h1 style={{fontSize: '20px', marginLeft: '8px'}}>Orders</h1>
                        </div>
                        <div className="order__list">
                            {/* This is probably the only comment in whole project
                            I'm trying to prioritize writing intuitive understandable code*/}
                            {/**/}
                            {/* Code down below is a representation of possible render of order card using data from backend  */}

                            {data ? (
                                data.length > 0 ? (
                                    data.map((user) => (
                                        <OrderCard openOrderId={openOrderId} setOpenOrderId={setOpenOrderId} data={user}
                                                   orderOpen={orderOpen} setOrderOpen={setOrderOpen}/>
                                    ))
                                ) : (
                                    <p>No users available.</p>
                                )
                            ) : (
                                <p>Loading...</p>
                            )}
                            {Array(4).fill(<OrderCard openOrderId={openOrderId} setOpenOrderId={setOpenOrderId}
                                                      orderOpen={orderOpen} setOrderOpen={setOrderOpen}/>)}
                        </div>
                    </div>
                    :
                    <>
                        {/* I don't think that this approach of using map is the best one in the situation,
                        since it shouldn't render more than 1 order for every opening
                        but as of now it works so I left it as it's */}
                        {data ? (
                            data.length > 0 ? (
                                data.map((user) => (
                                    <Order data={user} openOrderId={openOrderId} setOpenOrderId={setOpenOrderId}
                                           orderOpen={orderOpen} setOrderOpen={setOrderOpen}
                                           ordersControl={ordersControl}
                                           setOrdersControl={setOrdersControl}/>))
                            ) : (
                                <p>No users available.</p>
                            )
                        ) : (
                            <Order openOrderId={openOrderId} setOpenOrderId={setOpenOrderId}
                                   orderOpen={orderOpen} setOrderOpen={setOrderOpen}
                                   ordersControl={ordersControl}
                                   setOrdersControl={setOrdersControl}/>
                        )
                        }
                    </>
            }
        </>
    )
}

type OrderProps = Props & PropsOrder & { data?: Data };

function Order({
                   setOrdersControl,
                   ordersControl,
                   orderOpen,
                   setOrderOpen,
                   openOrderId,
                   setOpenOrderId,
                   data
               }: OrderProps) {
    return (

        <>
            <div className="orders__wrapper" style={{margin: '12px 12px 0 12px'}}>
                <div style={{display: 'flex'}}>
                    <img onClick={() => setOrderOpen(false)} style={{cursor: 'pointer'}} src={cross}
                         alt=""/>
                    <h1 style={{
                        fontSize: '20px',
                        marginLeft: '8px'
                    }}>{`${openOrderId !== 0 ? '#' + openOrderId : '#15325'}`}</h1>
                </div>
                <OrderCard data={openOrderId !== 0 ? data : undefined} orderOpen={orderOpen}
                           setOrderOpen={setOrderOpen}/>
                <YourGoods/>
            </div>
        </>

    )
}

function YourGoods() {
    return (

        <>
            <div className="goods__header">
                <span>Your Goods:</span>
                <h3 style={{margin: '12px 0 8px 0'}}>1 - 279,99$</h3>
            </div>
            <div className="goods__card">
                <div>
                    <div className="goods__amount">
                        40,500 <span style={{
                        marginLeft: '6px',
                        fontWeight: '12px',
                        padding: '8px',
                        background: 'rgba(255, 255, 255, 0.12)',
                        borderRadius: '24px'
                    }}>+1,500</span>
                    </div>
                    <div className="goods__price">
                        279,99$ <span
                        style={{marginLeft: '2px', fontWeight: '12px', opacity: '.5', textDecoration: 'line-through'}}
                        className="goods__price-old">749.99$</span>
                    </div>
                </div>
            </div>
            <Button
                style={{width: '296px', padding: '12px', marginTop: '12px'}}
                content={'Ask ?'}/>
        </>
    )
}

function OrderCard(props: OrderCardProps) {
    return (
        <div onClick={() => {
            props.setOrderOpen(true);
            props.setOpenOrderId!(props.data?.["Transaction ID"] ? props.data?.["Transaction ID"] : 0)
        }} className="order__card">
            <OrderCardBar>
                <>
                    <OrderTag label={"Transaction ID"}
                              value={`${props.data?.["Transaction ID"] ? props.data?.["Transaction ID"] : '#15325'}`}/>
                    <OrderTag label={"Date"} value={`${props.data?.["Date"] ? props.data?.["Date"] : '12.06.2024'}`}/>
                    <OrderTag label={"Status"}
                              value={`${props.data?.["Status"] ? props.data?.["Status"] : '🟢Success'}`}/>
                </>
            </OrderCardBar>
            <hr style={{margin: "unset", opacity: '10%'}}/>
            <OrderCardBar>
                <>
                    <OrderTag label={"Game Name"}
                              value={`${props.data?.["Game Name"] ? props.data?.["Game Name"] : 'Ernardd'}`}/>
                    <OrderTag label={"Game ID"}
                              value={`${props.data?.["Game ID"] ? props.data?.["Game ID"] : '1523523623'}`}/>
                    <OrderTag label={"Ammount"}
                              value={`${props.data?.["Ammount"] ? props.data?.["Ammount"] : '$153,26'}`}/>
                </>
            </OrderCardBar>
        </div>
    )
}

function OrderCardBar({children}: { children: React.ReactNode }) {
    return (

        <div style={{display: 'flex', justifyContent: 'space-between', padding: '12px 16px'}}>

            {children}
        </div>


    )
}


function OrderTag({label, value}: { label: string; value: string }) {
    return (
        <>
            <div className="order-tag">
                <h4 className={''} style={{}}>{label}</h4>
                <h3>{value}</h3>
            </div>
        </>
    )
}

export default OrdersPage;