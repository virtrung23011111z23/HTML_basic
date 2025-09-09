
import { useState } from "react";
import { IoMdAdd, IoIosRemove } from "react-icons/io";
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
    const cartItems = JSON.parse(localStorage.getItem(keyLocalStorageItemCart) || "[]");
    const productList: dataProduct[] = JSON.parse(localStorage.getItem(keyLocalStorageListSP) || "[]");
    const [count, setCount] = useState<number>(0);
    console.log(cartItems)
    return (
        <><div className="wrapper">
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
                            <button className="product__update--count"><IoMdAdd /></button>
                            <input type="number" value={cart.count} onChange={(e) => setCount(Number(e.target.value))} />
                            <button className="product__update--count"><IoIosRemove /></button>
                        </li>
                        <li>${numberProduct.price}</li>
                        <li>${numberProduct.price}</li>
                    </ul>)
            })}
        </div></>
    )
}