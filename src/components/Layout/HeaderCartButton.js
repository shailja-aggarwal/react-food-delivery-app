import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = props => {
   const [buttonIsHighlighted, setBtnHightlight] = useState(false)
   const cartCtx = useContext(CartContext);
   const {items} = cartCtx;

   const numberOfCartItems = items.reduce((curr, item) => {
     return curr + item.amount;
   }, 0);

   const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`

   useEffect(()=> {
      if(items.length === 0){
         return
      } 
      setBtnHightlight(true);
      const timer = setTimeout(() => {
         setBtnHightlight(false);
      }, 3000);

      return () => {
         clearTimeout(timer)
      }

   }, [items])

    return <button className = {btnClasses} onClick={props.onClick}>
       <span className={classes.icon}>
            <CartIcon/>
        </span> 
       <span>Your Cart</span> 
       <span className={classes.badge}>{numberOfCartItems}</span> 
    </button>
};

export default HeaderCartButton