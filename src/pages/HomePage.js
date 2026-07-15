import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio, Pagination } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import '../styles/Homepage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Set how many products you want per page
  const pageSize = 6;

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get ALL products dynamically bypassing backend limits
  const getAllProducts = async () => {
    try {
      setLoading(true);
      // Fetching from primary endpoint. If your backend pagination hides data,
      // you can replace this url with your main base get-product route if needed.
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setLoading(false);
      if (data?.products) {
        setProducts(data.products);
      } else {
        // Fallback to list endpoint if get-product structure differs
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/1`);
        setProducts(res.data.products || []);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Filter products via API
  const filterProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setLoading(false);
      setProducts(data?.products || []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Load initial categories and products
  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, []);

  // Monitor filter triggers
  useEffect(() => {
    setPage(1); // Reset to page 1 when filter changes
    if (!checked.length && !radio.length) {
      getAllProducts();
    } else {
      filterProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  // Handle Category Filtering checkboxes
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // FRONTEND CLIENT-SIDE PAGINATION SLICING:
  const indexOfLastProduct = page * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <Layout title={"All Products - Best offers "}>
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="Homepage Banner"
      />
      <div className="container-fluid row home-page">
        {/* Sidebar Filters */}
        <div className="col-md-2 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={`cat-${c._id}`}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={`price-${p._id}`}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        
        {/* Product Display Main Grid */}
        <div className="col-md-10">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {loading ? (
              <div className="text-center p-5 w-100">
                <h3>Loading Products...</h3>
              </div>
            ) : currentProducts.length === 0 ? (
              <div className="text-center p-5 w-100">
                <h3>No Products Found</h3>
              </div>
            ) : (
              currentProducts.map((p, index) => (
                <div className="card m-2" key={`prod-${p._id}-${index}`}>
                  <div className="card-img-wrapper">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  </div>
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price mt-auto">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-dark ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Fully Functional Numeric Pagination Component */}
          {!loading && products.length > 0 && (
            <div className="pagination-container">
              <Pagination
                current={page}
                pageSize={pageSize}
                total={products.length}
                onChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scrolls up on click
                }}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;