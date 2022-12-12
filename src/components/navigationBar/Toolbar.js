import React from "react";
import Basket from "../basket/Basket";
import NewProduct from "../newProductForm/NewProduct";
import Searching from "../searchProduct/Searching";

const Toolbar = ({
  handleTurkishCoffee,
  handleFilterCoffee,
  clickFilterCoffee,
  clickTurkishCoffee,
  toggleAdminPanel,
  selectCoffeeType,
  shoppingBasket,
  toggleBasketMenu,
  openBasketList,
  menuDropDown,
  refreshList,
  removeFromBasket,
  addNewProduct,
  handleSetNewProduct,
  newProduct,
  fuzzySearch,
}) => {
  return (
    <div className="nav-bar">
      <img
        width="80"
        alt="pageLogo"
        src="./images/the-coffee-house-logo-brandlogos.net_1g1ygr223.svg"
      />
      <div className="nav-btns">
        {selectCoffeeType ? <>
          <div className="coffee-type">
            <button className={clickTurkishCoffee && "clicked"} onClick={handleTurkishCoffee}>Turkish</button>
            <button className={clickFilterCoffee && "clicked"} onClick={handleFilterCoffee}>Filter</button>
          </div>
        </>: null}
        {/* {adminPanel ? (
          <>
            <NewProduct
              handleSetNewProduct={handleSetNewProduct}
              addNewProduct={addNewProduct}
              newProduct={newProduct}
            />
          </>
        ) : null} */}
        {clickFilterCoffee || clickTurkishCoffee  ? <>
          <NewProduct 
              className={!selectCoffeeType && "close-adding"}
              handleSetNewProduct={handleSetNewProduct}
              addNewProduct={addNewProduct}
              newProduct={newProduct}
            />
        </>
         : ""}
        <img
          onClick={toggleAdminPanel}
          width="20"
          alt="adminPanel"
          src="./images/admin-panel.svg"
        />
        <Searching fuzzySearch={fuzzySearch} /> 
        <img
          onClick={refreshList}
          alt="refresh-button"
          width="20"
          src="./images/icons8-refresh.svg"
        />
        <img
          onClick={toggleBasketMenu}
          alt="basket-icon"
          width="20"
          src="./images/shopping-cart-icon.svg"
        />
        {openBasketList && (
          <div className="shopping-list">
            {shoppingBasket.length === 0 ? (
              <h3>Your List Is Empty</h3>
            ) : (
              <Basket
                removeFromBasket={removeFromBasket}
                shoppingBasket={shoppingBasket}
              />
            )}
          </div>
        )}

        {shoppingBasket.length > 0 && (
          <span className="total">{shoppingBasket.length}</span>
        )}
        <h3 onClick={menuDropDown}>All Products</h3>
      </div>
    </div>
  );
};

export default Toolbar;
