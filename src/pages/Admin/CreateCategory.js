import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div 
        className="container-fluid py-5 px-md-5"
        style={{ 
          backgroundColor: "#f8fafc", 
          minHeight: "90vh",
          fontFamily: "'Plus Jakarta Sans', sans-serif" 
        }}
      >
        <div className="row g-4" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Admin Navigation Sidebar Menu */}
          <div className="col-md-3">
            <div className="shadow-sm rounded-4 bg-white p-2" style={{ border: "1px solid #e2e8f0" }}>
              <AdminMenu />
            </div>
          </div>

          {/* Manage Categories Panel Canvas */}
          <div className="col-md-9">
            <div className="card shadow-sm border-0 rounded-4 p-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
              <h2 className="fw-bold text-dark mb-4" style={{ letterSpacing: "-0.5px" }}>
                Manage Dashboard Categories
              </h2>

              {/* Top Creation Entry Form Input Row */}
              <div className="mb-4">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>

              {/* Interactive Categories Ledger Table List View */}
              <div className="table-responsive rounded-3" style={{ border: "1px solid #e2e8f0" }}>
                <table className="table table-hover align-middle m-0">
                  <thead style={{ backgroundColor: "#f8fafc" }}>
                    <tr className="text-muted text-uppercase fw-bold" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                      <th scope="col" className="ps-4 py-3" style={{ width: "60%" }}>Category Label Name</th>
                      <th scope="col" className="pe-4 py-3 text-end">Control Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <tr key={c._id} style={{ transition: "all 0.2s" }}>
                        <td className="ps-4 fw-semibold text-dark" style={{ fontSize: "15px" }}>
                          {c.name}
                        </td>
                        <td className="pe-4 text-end">
                          <button
                            className="btn btn-sm px-3 fw-bold me-2"
                            style={{ 
                              backgroundColor: "#f1f5f9", 
                              color: "#475569",
                              border: "1px solid #cbd5e1",
                              borderRadius: "6px"
                            }}
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm px-3 fw-bold"
                            style={{ 
                              backgroundColor: "#fee2e2", 
                              color: "#dc2626",
                              border: "none",
                              borderRadius: "6px"
                            }}
                            onClick={() => handleDelete(c._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Antd Updating Trigger Backdrop Modal Overlay */}
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
              destroyOnClose
              centered
              bodyStyle={{ 
                padding: "24px", 
                fontFamily: "'Plus Jakarta Sans', sans-serif" 
              }}
            >
              <div className="mb-3">
                <h5 className="fw-bold text-dark mb-1" style={{ letterSpacing: "-0.3px" }}>
                  Modify Category
                </h5>
                <p className="text-muted small">Update the registration alias title label rules down below.</p>
              </div>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;