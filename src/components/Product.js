import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const id = useParams();

  const getSingleProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://course-api.com/javascript-store-single-product?id=${id.id}`
      );
      setProduct(response.data);
    } catch (err) {
      setError(true);
      console.log(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  return (
    <>
      <Link to={"/"} className="btn home-link">
        Back Home
      </Link>
      <section className="product" key={product.id}>
        {loading || error ? (
          <h3 className={error ? "error" : "product-loading"}>
            <>
              <strong>{error ? "Error" : "Loading..."}</strong>
            </>
          </h3>
        ) : (
          <div className="product-wrapper">
            <img
              src={product.fields?.image[0].url}
              alt={product.fields?.image[0].filename}
              className="img"
            />
            <div className="product-info">
              <h3>{product.fields?.name}</h3>
              <h5>{product.fields?.company}</h5>
              <span>$ {(product.fields?.price / 100).toFixed(2)}</span>
              <div className="colors">
                {product.fields?.colors.map((color) => (
                  <span
                    className="product-color"
                    style={{ backgroundColor: `${color}` }}
                  ></span>
                ))}
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deserunt excepturi accusamus sapiente aliquam fugiat
                exercitationem ducimus totam in tenetur debitis consequuntur
                minima, quidem quaerat esse commodi rerum doloremque quam
                praesentium fuga earum facere, ullam sunt recusandae. Deserunt
                aut, eaque obcaecati a voluptatibus, natus distinctio amet
                magnam unde perspiciatis dolorem minima!
              </p>
              <button className="btn">Add To Cart</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Product;
