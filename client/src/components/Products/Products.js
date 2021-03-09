import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Products.css";
import PropTypes from "prop-types";

const Products = ({ products, filter, priceRange, sale }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const [min, max] = priceRange;
    filter === "All"
      ? setFilteredProducts(products.filter(({ price }) => price >= min && price <= max))
      : setFilteredProducts(
          products.filter(({ category, price }) => category === filter && price >= min && price <= max)
        );
  }, [filter, priceRange, products]);

  const productsItems = filteredProducts.map(({ title, image, price, _id }) => (
    <Product sale={sale && price > 60} title={title} price={price} image={image} key={_id} id={_id} />
  ));

  return <section className="products">{productsItems}</section>;
};

Products.propTypes = {
  products: PropTypes.array,
  filter: PropTypes.string,
};

export default Products;
