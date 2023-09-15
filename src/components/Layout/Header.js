import {Fragment} from 'react';
import mealsImage from '../../assets/foodimg.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';
const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h2>ReactMeals</h2>
            <HeaderCartButton onClick = {props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt = "delicious food"/>
        </div>
    </Fragment>
}

export default Header;