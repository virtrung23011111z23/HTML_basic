import { Link } from "react-router-dom"
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
export default function Header() {
    return (
        <>
            <div className="header-container">
                <div className="wrapper">
                    <div className="header-container_box">
                        <div className="brand">
                            <img src="../src/assets/img/logo.png" />
                            <h1>Nike</h1>
                        </div>
                        <div className="header-navbar">
                            <Link to="/">HOME</Link>
                            <Link to="/">ABOUT</Link>
                            <Link to="/">BILLS</Link>
                            <Link to="/cart" className="Shoppingcart">
                                <MdOutlineShoppingCartCheckout size={25} />
                                <div className="Shoppingcart_number-card">
                                    <p>3</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}