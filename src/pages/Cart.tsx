
import { useCallback, useEffect, useState } from "react";
import { IoMdAdd, IoIosRemove } from "react-icons/io";
import { IoMdCloseCircleOutline, IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom"
interface CartItems {
    id: number
    count: number
}
export interface dataProduct {
    id: number,
    name: string,
    price: number,
    src: string,
    quantity: number,
    des: string,
}
export default function Cart() {
    const keyLocalStorageItemCart = "DANHSACHITEMCART";
    const keyLocalStorageListSP = "DANHSACHSP";
    const [cartItems, setCartItems] = useState<CartItems[]>(() => {
        const cartPart = localStorage.getItem(keyLocalStorageItemCart);
        return cartPart ? JSON.parse(cartPart) : [];
    });
    const [total, setTotal] = useState(0)
    const productList: dataProduct[] = JSON.parse(localStorage.getItem(keyLocalStorageListSP) || "[]");
    const handleCount = useCallback((idInput: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const countInput = e.target.value;
        setCartItems(prev => prev.map(items =>
            idInput == items.id ? { ...items, count: Number(countInput) } : items
        ))
    }, []);
    const handleUpCount = (idCount: number, iCount: number) => {
        setCartItems(prev => prev.map(items =>
            items.id == idCount ? { ...items, count: iCount + 1 } : items
        ))
    }
    const handleDownCount = (idCount: number, iCount: number) => {
        if (iCount == 1) {
            setCartItems(prev => prev.filter(i => i.id !== idCount))
        } else {
            setCartItems(prev => prev.map(items =>
                items.id == idCount ? { ...items, count: iCount - 1 } : items
            ))
        }
    }
    const handleClear = (iddCart: number) => {
        setCartItems(prev => prev.filter(item => item.id !== iddCart))
    }
    useEffect(() => {
        localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cartItems))
    }, [cartItems]
    )
    useEffect(() => {
        let totalPart = 0;
        cartItems.map((i) => {
            const numberProduct = productList.find(p => p.id === i.id);
            if (!numberProduct) return null;
            totalPart = totalPart + numberProduct.price*i.count
        })
        setTotal(totalPart)
    },[cartItems])
    return (
        <>
            <div className="wrapper">
                <ul className="cart__header cart__list">
                    <li className="cart__name">Product Name</li>
                    <li>Quantity</li>
                    <li>Subtotal</li>
                    <li>Total</li>
                    <li>Clear Cart</li>
                </ul>
                {cartItems.map((cart: CartItems) => {
                    const numberProduct = productList.find(p => p.id === cart.id);
                    if (!numberProduct) return null;
                    return (
                        <ul key={cart.id} className="cart__list">
                            <li><div className="cart__product__Info">
                                <img src={numberProduct.src} />
                                <div className="cart__product__des">
                                    <h3>{numberProduct.name}</h3>
                                    <p>Quantity: {numberProduct.quantity}</p>
                                </div>
                            </div>
                            </li>
                            <li>
                                <button className="cart__update--count" onClick={() => handleUpCount(cart.id, cart.count)}><IoMdAdd size={24} /></button>
                                <input type="number" className="cart__input" value={cart.count} onChange={(e) => handleCount(cart.id, e)} />
                                <button className="cart__update--count" onClick={() => handleDownCount(cart.id, cart.count)}><IoIosRemove size={24} /></button>
                            </li>
                            <li>${numberProduct.price}</li>
                            <li>${numberProduct.price * cart.count}</li>
                            <li><button className="cart__clear" onClick={() => handleClear(cart.id)}><IoMdCloseCircleOutline size={30} /></button></li>
                        </ul>)
                })}
                <div className="cart__total">
                    <p>Total: ${total}</p>
                </div>
                <div className="cart__button">
                    <Link to="/" ><IoMdArrowRoundBack size={10} /> Back to Shopping</Link>
                    <button className="cart__buy">Buy</button>
                </div>
            </div>
        </>
    )
}