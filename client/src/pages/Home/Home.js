import React, { useContext, useEffect, useState } from "react";
import Products from "../../components/Products/Products";
import Header from "../../components/Header/Header";
import SaleCountDown from "../../components/SaleCountDown/SaleCountDown";
import SaleContext from "../../contexts/SaleContext";
import ProductsContext from "../../contexts/ProductsContext";
import AdminContext from "../../contexts/AdminContext";
import "./Home.css";
import AddPopup from "../../components/Popups/Add/AddPopup";

const Home = () => {
  const [products, setProducts] = useContext(ProductsContext);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sale, setSale] = useContext(SaleContext);
  const [admin, setAdmin] = useContext(AdminContext);
  const [showAddPopup, setShowAddPopup] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/products", {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "text/html",
        },
      }); //"https://fakestoreapi.com/products");
      const json = await res.json();
      setProducts(json);
    }

    fetchData();
  }, [setProducts]);

  useEffect(() => {
    const groupBy = (xs, key) =>
      xs.reduce((rv, x) => {
        rv[x[key]] = true || [];
        return rv;
      }, {});
    setCategories(Object.keys(groupBy(products, "category")));
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      setMinPrice(Math.floor(Math.min(...products.map(({ price }) => price))));
      setMaxPrice(Math.ceil(Math.max(...products.map(({ price }) => price))));
    }
  }, [products]);

  // useEffect(() => {
  //   if ((minPrice !== 0) & (maxPrice !== 0)) {
  //     setPriceRange([minPrice, maxPrice]);
  //   }
  //   // console.log(priceRange);
  //   // console.log(minPrice);
  // }, [maxPrice, minPrice]);

  return (
    <React.Fragment>
      <SaleCountDown onFinish={setSale} />
      <Header
        selectedFilter={setFilter}
        categories={categories}
        selectedRange={setPriceRange}
        // priceRange={priceRange}
        MIN={minPrice}
        MAX={maxPrice}
      />
      {admin && (
        <div className="addProduct-div">
          <button className="addProduct-button" onClick={() => setShowAddPopup(true)}>
            Add Product
          </button>
          {showAddPopup && (
            <AddPopup
              closePopup={() => {
                setShowAddPopup(false);
              }}
            />
          )}
        </div>
      )}
      <Products sale={sale} filter={filter} products={products} priceRange={priceRange} />
    </React.Fragment>
  );
};

export default Home;
