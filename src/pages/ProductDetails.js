import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initial product details trigger
  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  // Get single product data
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Shared generic add to cart handler
  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <Layout title={`${product.name || "Product Details"} - E-Shop`}>
      <div className="container product-details-wrapper">
        {loading ? (
          <div className="text-center p-5">
            <h3>Loading Product Details...</h3>
          </div>
        ) : (
          <>
            {/* Main Product Meta View */}
            <div className="row product-details">
              <div className="col-md-6 product-img-section">
                <div className="main-img-container">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="img-fluid main-product-image"
                    alt={product.name}
                  />
                </div>
              </div>
              
              <div className="col-md-6 product-details-info">
                <span className="category-badge">{product?.category?.name}</span>
                <h1 className="product-main-title">{product.name}</h1>
                
                <div className="price-tag-large">
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>

                <div className="description-box">
                  <h5>Description</h5>
                  <p>{product.description}</p>
                </div>

                <button 
                  className="btn btn-primary add-to-cart-main"
                  onClick={() => handleAddToCart(product)}
                >
                  ADD TO SHOPPING CART
                </button>
              </div>
            </div>

            <hr className="section-divider" />

            {/* Similar Products Recommendation Carousels */}
            <div className="similar-products">
              <h4 className="section-title">Similar Products You Might Like</h4>
              {relatedProducts.length < 1 && (
                <div className="no-products-fallback">
                  <p>No identical recommendations found in this category.</p>
                </div>
              )}
              
              <div className="d-flex flex-wrap gallery-grid">
                {relatedProducts?.map((p) => (
                  <div className="card product-card-fixed" key={p._id}>
                    <div className="card-img-wrapper">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </div>
                    <div className="card-body">
                      <div className="card-meta-row">
                        <h5 className="card-title-fixed">{p.name}</h5>
                        <span className="card-price-fixed">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </div>
                      <p className="card-text-fixed">
                        {p.description.substring(0, 55)}...
                      </p>
                      <div className="card-actions-grid">
                        <button
                          className="btn btn-info-fixed"
                          onClick={() => {
                            navigate(`/product/${p.slug}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          Details
                        </button>
                        <button
                          className="btn btn-dark-fixed"
                          onClick={() => handleAddToCart(p)}
                        >
                          + Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;