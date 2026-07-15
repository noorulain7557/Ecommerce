import { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
        // Fix is here 👇
        setCategories(data?.category || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setCategories([]);
      }
    };

    getCategories();
  }, []);

  return categories;
};

export default useCategory;
