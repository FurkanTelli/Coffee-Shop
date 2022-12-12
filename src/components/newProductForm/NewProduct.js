import React from "react";

const NewProduct = ({ handleSetNewProduct, addNewProduct, newProduct }) => {
  return (
    <div className="newProduct-info">
      <input
        type="text"
        onChange={(event) => handleSetNewProduct({ brand: event.target.value })}
        placeholder="brand"
        value={addNewProduct.brand}
      />
      <input
        type="number"
        onChange={(event) => handleSetNewProduct({ price: event.target.value })}
        placeholder="price"
        value={newProduct.price}
      />
      <input
        type="text"
        onChange={(event) =>
          handleSetNewProduct({ imgUrl: event.target.value })
        }
        placeholder="URL"
        value={newProduct.imgUrl}
      />
      <button onClick={addNewProduct} className="add">
        add
      </button>
    </div>
  );
};
export default NewProduct;
