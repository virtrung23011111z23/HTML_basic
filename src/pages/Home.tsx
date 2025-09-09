import type { dataProduct } from '../App'
import { useEffect, useState } from 'react';
import { MdAddShoppingCart, MdClose } from "react-icons/md";
import { IoMdAdd, IoIosRemove } from "react-icons/io";
interface Productmodal {
    open: boolean,
    name: string,
    id: number,
    src: string
    count: number
}
interface CartItems {
    id: number
    count: number
}
export default function Home() {
    const keyLocalStorageListSP = "DANHSACHSP";
    const keyLocalStorageItemCart = "DANHSACHITEMCART";
    const [productList, setproductList] = useState<dataProduct[]>([])
    const [quantity, setQuantity] = useState<number>(0)
    const [cartItems, setcartItems] = useState<CartItems[]>(() =>{
        const carShopping = localStorage.getItem(keyLocalStorageItemCart);
        return carShopping ? JSON.parse(carShopping) : [] ;
    })
    const [modalQuantity, setModalQuantity] = useState<Productmodal>({
        open: false,
        name: "",
        id: 0,
        src: "",
        count: 0
    })
    useEffect(() => {
        const productListpart = JSON.parse(localStorage.getItem(keyLocalStorageListSP) || "[]");
        setproductList(productListpart)
    }, [])
    const openModelAddCart = (name: string, id: number, src: string, quant: number) => {
        setModalQuantity({
            open: true,
            name: name,
            id: id,
            src: src,
            count: quant
        })
    }
    const closeModel = () => {
        setModalQuantity(
            prev => ({ ...prev, open: false })
        )
    }

    const handleAddCart = () => {
        const ItemCartId = cartItems.find(i => i.id === modalQuantity.id)
        if (ItemCartId) {
            setcartItems(prev => prev.map((i) => i.id == modalQuantity.id ? {...i,count: i.count + quantity} : i))
        }
        else {
            setcartItems(prev => [...prev, { id: modalQuantity.id, count: quantity }])
        }
    }
    useEffect(() => {
        localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cartItems))
    }, [cartItems])

    const handleChanhge = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    useEffect(() => {
        if (modalQuantity.open === false) setQuantity(0)
    }, [modalQuantity])
    return (
        <>
            <div className="wrapper">
                <div className="product__container">
                    {productList.map((i) =>
                        <>
                            <div key={i.src} className="product__box">
                                <div className="product__img">
                                    <img src={i.src} />
                                    <button className="product__add-cart" onClick={() => openModelAddCart(i.name, i.id, i.src, i.quantity)}>
                                        <MdAddShoppingCart size={30} />
                                    </button>
                                </div>
                                <div className="product__content">
                                    <h2>{i.name}</h2>
                                    <div className="product__des">
                                        <p>${i.price}</p>
                                        <p>Quantily:{i.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={`Modal__fixed ${modalQuantity.open ? "active" : ""}`}>
                <div className="Modal__quantity">
                    <div className="Modal__header">
                        <button className="btn Modal_button-close" onClick={closeModel}>
                            <MdClose size={20} />
                        </button>
                    </div>
                    <div className="Modal__Info">
                        <h2>{modalQuantity.name}</h2>
                        <div className="Modal__img_product">
                            <img src={modalQuantity.src} />
                        </div>
                        <form onSubmit={handleAddCart} className="Modal__form_addcart" onChange={handleChanhge}>
                            <input type="hidden" name="id" value={modalQuantity.id} />
                            <div className="Modal_form">
                                <button type='button' className={`btn btn_update-quantity ${quantity >= modalQuantity.count ? "disabled" : ""}`} onClick={() => setQuantity(quantity => quantity + 1)}><IoMdAdd /></button>
                                <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                                <button type='button' className={`btn btn_update-quantity ${quantity <= 0 ? "disabled" : ""}`} onClick={() => setQuantity(quantity => quantity - 1)}><IoIosRemove /></button>
                            </div>
                            <button type='submit' className=' Modal__btn_addcart'>Add to cart</button>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}