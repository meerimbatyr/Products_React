import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://course-api.com/javascript-store-products"
      );
      setProducts(res.data);
    } catch (err) {
      setError(true);
      console.log(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <section className="products">
      <div className="title">
        <h2>Our Products</h2>
        <div className="title-underline"></div>
      </div>
      <div className="products-center">
        {loading || error ? (
          <div className={error ? "error" : "loading"}>
            {error && "Something went wrong"}
          </div>
        ) : (
          <div className="products-container">
            {products.map((product) => {
              const { fields } = product;
              return (
                <Link
                  to={`/product/${product.id}`}
                  className="single-product"
                  key={product.id}
                >
                  <img
                    src={fields.image[0].url}
                    alt={fields.image[0].filename}
                    className="single-product-img img"
                  />
                  <footer>
                    <h5 className="name">{fields.name}</h5>
                    <span className="price">
                      $ {(fields.price / 100).toFixed(2)}
                    </span>
                  </footer>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
