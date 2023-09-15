import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);


    const cartCtx = useContext(CartContext);
    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        debugger
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true)
        fetch('https://react-http-8b934-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        }).then((res) => res.json())
        .then((res) => {
            setIsSubmitting(false)
            setDidSubmit(true)
            cartCtx.clearCart();
        }).catch((err) => {console.log(err)})
    }

    const cartItems = (
    <ul className = {classes['cart-items']}
    >{cartCtx.items.map(item => 
    <CartItem 
        key = {item.id} 
        name = {item.name} 
        amount = {item.amount} 
        price = {item.price} 
        onRemove = {cartItemRemoveHandler.bind(null, item.id)} 
        onAdd = {cartItemAddHandler.bind(null, item)}
        />
    )}
    </ul>
    )
     
    const modalActions = (<div className={classes.actions}>
    <button className={classes['button--alt']} onClick = {props.onClose}>Close</button>
    {hasItems && <button className={classes.button} onClick = {orderHandler}>Order</button>}
</div> )

const cartModalContent = (
    <Fragment>
        {cartItems}
           <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
           </div> 
           {isCheckout && <Checkout onCancel = {props.onClose} onConfirm = {submitOrderHandler}/>}
            {!isCheckout && modalActions}
    </Fragment>
)

const isSubmittingModalContent = (<p>Sending order data</p>)
const sucessfullySent = (<Fragment><p>Successfully sent the order</p><div className={classes.actions}>
<button className={classes['button--alt']} onClick = {props.onClose}>Close</button>
</div></Fragment>)

    return(
        <Modal onClose = {props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && sucessfullySent}
        </Modal>
    )
}

export default Cart