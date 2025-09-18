import {useState } from "react";
import type { CartItemsProps } from "../../types/cart"


export const keyLocalStorageItemCart = "DANHSACHITEMCART";
export const keyLocalStorageListSP = "DANHSACHSP";

export function useCartStronge(){
    const [cartItems, setCartItems] = useState<CartItemsProps[]>(() => {
            const cartPart = localStorage.getItem(keyLocalStorageItemCart);
            return cartPart ? JSON.parse(cartPart) : [];
        });
    return {cartItems,setCartItems}
}