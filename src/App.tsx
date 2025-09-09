import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './compoment/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import '../public/css/main.css'

export interface dataProduct {
  id: number,
  name: string,
  price: number,
  src: string,
  quantity: number,
  des: string,
}
function App() {
  const listDatavalidate = [
    {
      id: 1,
      name: "case đen",
      price: 800,
      src: "../src/assets/img/case1.png",
      quantity: 11,
      des: "Màu đen"
    },
    {
      id: 2,
      name: "case xanh",
      price: 1000,
      src: "../src/assets/img/case2.png",
      quantity: 14,
      des: "Màu xanh"
    },
    {
      id: 3,
      name: "case hồng",
      price: 1100,
      src: "../src/assets/img/case3.png",
      quantity: 12,
      des: "Màu xanh"
    }, 
    {
      id: 4,
      name: "case robot",
      price: 1500,
      src: "../src/assets/img/case4.png",
      quantity: 15,
      des: "Trông nó robot"
    }

  ]
  const keyLocalStorageListSP = "DANHSACHSP";
  useEffect(() => {
    const listDataPart = listDatavalidate.map(i => ({
      id: Number(i.id),
      name: String(i.name),
      price: Number(i.price),
      src: String(i.src),
      quantity: Number(i.quantity),
      des: String(i.des),
    }));
    localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listDataPart))
  }, [])
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
