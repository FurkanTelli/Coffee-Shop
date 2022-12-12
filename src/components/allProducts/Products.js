import React from "react";

const Products = ({searchResult, allProduct, addToBasket, deleteCoffee }) => {

  // console.log(searchResult.length)
  // console.log(allProduct.length)
  return (
    <div className="all-coffee">
      {searchResult.length ? //searchResult değer i içi dolu ise ve bu demektir ki set edilmiştir sonrasında searchResult set edilsin
      searchResult.map((productObj, index) => (
        <div key={index} className="coffee-card" id={Math.random()}>
           <img width="60" src={productObj.imgUrl} />
          <div>
            <h5>Brand: {productObj.brand}</h5>
            <p>Price: {productObj.price}</p>
          </div>
        </div>
      ))
      : allProduct.map((product, index) =>  ( 
        
        <div //searchResult değeri içi DEĞİL ise  sonrasında allProduct set edilsin
          onClick={() => addToBasket(product)}
          className="coffee-card"
          key={index}
          id={Math.random()}
        >
          <img width="60" src={product.imgUrl} />
          <div>
          <span onClick={() => deleteCoffee(product.id)}>X</span>
            <h5>Brand: {product.brand}</h5>
            <p>Price: {product.price}</p>
          </div>
        </div>
      )
    
      )}
    </div>
  );
};

export default Products;
