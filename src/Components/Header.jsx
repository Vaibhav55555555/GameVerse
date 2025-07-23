import React, { useContext, useEffect, useState } from "react";
import logo from "./../assets/Images/logo.png";
import logo1 from "./../assets/Images/logo1.png";

import SideNavGenreList from "./SideNavGenreList";
import { HiMoon, HiOutlineBars3CenterLeft, HiOutlineMagnifyingGlass, HiOutlineXMark, HiSun, HiOutlineShoppingCart } from "react-icons/hi2";
import { ThemeContext } from "../Context/ThemeContext";
import { useCart } from "../Context/CartContext";

function Header() {
  const [toggle,setToggle]=useState(false);
  const {theme,setTheme}=useContext(ThemeContext)
  const { cart, addToCart, removeFromCart, removeOneFromCart, clearCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  // const {toggleColorMode, colorMode} = useColorMode();

  useEffect(()=>{
    console.log('THEME--',theme)

  },[])

  const updateCartQuantity = (item, delta) => {
    if (delta === 1) {
      addToCart(item);
    } else if (delta === -1 && (item.quantity || 1) > 1) {
      removeOneFromCart(item.id);
    }
  };

  return (
    <div className="flex items-center p-3 relative">
      <img src={logo} width={60} height={60} className="hidden md:block" />
      <div className="md:hidden">
      {!toggle? <HiOutlineBars3CenterLeft onClick={()=>setToggle(!toggle)}
      className="dark:text-white text-[25px] cursor-pointer"/>
      :<HiOutlineXMark onClick={()=>setToggle(!toggle)}
      className="dark:text-white text-[25px] cursor-pointer"/>}
      {toggle?
        <div className="absolute z-10 bg-white  mt-3 dark:bg-[#121212]">
          <SideNavGenreList/>
          </div>:null
      }
      </div>
      <div className="flex bg-slate-200 mx-5 w-full p-2 rounded-full items-center px-2">
        <HiOutlineMagnifyingGlass/>
        <input type="text" placeholder="Search Games" 
        className="bg-transparent w-full outline-none pl-2 items-center rounded-full"  />
      </div>
      <div className="flex items-center ml-4 space-x-2">
        <button className="relative flex items-center justify-center h-15 w-15 bg-slate-200 rounded-lg border-2 border-blue-600 focus:outline-none" onClick={() => setCartOpen(!cartOpen)}>
          <HiOutlineShoppingCart className="text-8xl dark:text-white" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">{cart.length}</span>
          )}
        </button>
        <span className="flex items-center h-12">
          {theme=='dark'?  <HiSun className="text-[32px] cursor-pointer bg-gray-200 text-black p-1 rounded-full align-middle" onClick={()=>setTheme('light')} />
            :
            <HiMoon className="text-[32px] cursor-pointer bg-gray-200 text-black p-1 rounded-full align-middle" onClick={()=>setTheme('dark')} />}
        </span>
      </div>
      {/* Cart dropdown/modal placeholder */}
      {cartOpen && (
        <div className="absolute right-0 top-16 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-[420px] z-50">
          <h3 className="font-bold text-lg mb-2 dark:text-white">Cart</h3>
          {cart.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-300">Your cart is empty.</div>
          ) : (
            <>
              <ul className="mb-4 max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
                {cart.map(item => (
                  <li key={item.id} className="flex justify-between items-center py-2">
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-semibold text-gray-900 dark:text-white truncate">{item.name}</span>
                      <span className="text-blue-700 font-bold">${item.price}</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-l text-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600" onClick={() => updateCartQuantity(item, -1)} disabled={item.quantity <= 1}>-</button>
                      <span className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-bold">{item.quantity || 1}</span>
                      <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-r text-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600" onClick={() => updateCartQuantity(item, 1)}>+</button>
                    </div>
                    <button className="ml-4 text-red-600 hover:text-red-800 font-bold" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-900 dark:text-white">Total:</span>
                <span className="text-xl font-bold text-blue-700">${cart.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0).toFixed(2)}</span>
              </div>
              <button className="w-full bg-emerald-600 text-black font-bold py-2 rounded shadow border border-emerald-800 hover:bg-emerald-800 transition mb-2">Proceed to Payment</button>
              <button className="w-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white py-2 rounded shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition mb-2" onClick={clearCart}>Clear Cart</button>
              <div className="text-xs text-gray-500 dark:text-gray-300 text-center">(Demo: Payment gateway coming soon!)</div>
            </>
          )}
        </div>
      )}
      {/* <InputGroup className="mx-8">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.300" />}
        />
        <Input type="text" variant="filled" placeholder="Search" borderRadius={50} />
      </InputGroup> */}
      
      {/* <Switch id="theme"  /> */}
      {/* <Switch colorScheme='green' isChecked={colorMode === 'dark'} 
      onChange={toggleColorMode} /> */}

      {/* <HiOutlineBars3CenterLeft className="text-[30px]" />
      {toggle?
      <div>
         <SideNavGenreList/>
        </div>
       
      :null} */}
      {/* <label className="ml-2">Dark</label> */}
    </div>
  );
}

export default Header;