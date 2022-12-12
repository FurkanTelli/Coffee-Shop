import React from 'react'

const Basket = ({shoppingBasket, removeFromBasket}) => {
  return (
    <div className='product-on-list'>
    {shoppingBasket.map((product, index) => {
        return (
        <div className='product-on-list' key={index}>
            <hr/>
            <span onClick={() => removeFromBasket(product) }>X</span>
            <p>Brand:{product.brand}</p>
            <p>Price:{product.price}</p>
        </div>
        )
    })}
    </div>
  )
}

export default Basket