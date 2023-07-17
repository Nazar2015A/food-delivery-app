import React, { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import "../../../styles/product-card.css";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  const { id, title, image01, price } = props.item;
  const dispatch = useDispatch();
  let arr = []
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.totalAmount);
  console.log(cartTotal)

  const [flag, setFlag] = useState(1)
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image01,
        price,
      })
    );
    setFlag(prev => prev + 1)
    console.log(flag)
  };
  useEffect(() => {
    // arr = cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  },[flag])
  useEffect(() => {
    // arr = cartItems
    localStorage.setItem('cartTotal', JSON.stringify(cartTotal))
  },[cartTotal])

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={image01} className="w-100" alt="prodict-img" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${id}`}>{title}</Link>
        </h5>
        <div className="product__bottom d-flex align-items-center justify-content-between">
          <span className="product__price">${price}</span>
          <button className="addTOCard__btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
