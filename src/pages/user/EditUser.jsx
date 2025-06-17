import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { updateUser, getUser } from "../../http";
import Modal from "../../components/modal/Modal";

const EditUser = () => {
  const initialState = {
    name: "",
    email: "",
    username: "",
    mobile: "",
    password: "",
    type: "",
    address: "",
    profile: "",
    status: "",
    adminPassword: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [updateFormData, setUpdatedFormData] = useState({});
  const [imagePreview, setImagePreview] = useState("/assets/icons/user.png");
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState("User");

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getUser(id);
      if (res.success) {
        setUserType(res.data.type);
        setFormData(res.data);
        setImagePreview(res.data.image || "/assets/icons/user.png");
      }
    })();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setUpdatedFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, profile: file }));
    setUpdatedFormData((prev) => ({ ...prev, profile: file }));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImagePreview(reader.result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateFormData.type && !showModal) {
      return setShowModal(true);
    }

    const fd = new FormData();
    Object.entries(updateFormData).forEach(([key, value]) =>
      fd.append(key, value)
    );

    const { success, message } = await updateUser(id, fd);
    if (success) toast.success(message);
  };

  const modalAction = () => setShowModal((prev) => !prev);

  return (
    <>
      {showModal && (
        <Modal close={modalAction} title="Confirm Role Change" width="35%">
          <div className="row m-3">
            <div className="col-md-4 text-center">
              <img className="rounded" src={imagePreview} width="120" alt="" />
            </div>
            <div className="col-md-8">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{formData.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{formData.email}</td>
                  </tr>
                  <tr>
                    <th>Current Role</th>
                    <td>{formData.type}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group px-3">
            <label>Admin Password</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fas fa-lock"></i>
                </div>
              </div>
              <input
                onChange={handleInputChange}
                value={formData.adminPassword || ""}
                type="password"
                name="adminPassword"
                className="form-control"
                placeholder={`Enter your password to confirm role change`}
              />
            </div>
          </div>
          <div className="text-center mt-3">
            <button
              className="btn btn-primary"
              type="submit"
              form="updateUserForm"
            >
              Confirm Update
            </button>
          </div>
        </Modal>
      )}

      <div className="main-content">
        <section className="section">
          <HeaderSection title={`Edit ${userType}`} />
          <div className="card shadow-sm">
            <div className="card-body px-4 py-4">
              <form id="updateUserForm" className="row" onSubmit={handleSubmit}>
                <div className="form-group col-md-12 text-center">
                  <input
                    type="file"
                    id="profile"
                    name="profile"
                    className="d-none"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="profile">
                    <img
                      src={imagePreview}
                      className="rounded shadow-sm"
                      width="120"
                      alt="User"
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                  <div className="text-muted mt-2">Click image to change</div>
                </div>

                {[
                  { label: "Name", icon: "user", name: "name", type: "text" },
                  { label: "Email", icon: "envelope", name: "email", type: "email" },
                  { label: "Username", icon: "user-circle", name: "username", type: "text" },
                  { label: "Mobile", icon: "phone", name: "mobile", type: "tel" },
                  { label: "Password", icon: "lock", name: "password", type: "password" },
                ].map((field, i) => (
                  <div className="form-group col-md-4" key={i}>
                    <label>{field.label}</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className={`fas fa-${field.icon}`}></i>
                        </div>
                      </div>
                      <input
                        onChange={handleInputChange}
                        value={formData[field.name] || ""}
                        type={field.type}
                        name={field.name}
                        className="form-control"
                      />
                    </div>
                  </div>
                ))}

                <div className="form-group col-md-3">
                  <label>User Type</label>
                  <select
                    name="type"
                    onChange={handleInputChange}
                    value={formData.type}
                    className="form-control"
                  >
                    <option>Employee</option>
                    <option>Client</option>
                    <option>Admin</option>
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label>Status</label>
                  <select
                    name="status"
                    onChange={handleInputChange}
                    value={formData.status}
                    className="form-control"
                  >
                    <option>Active</option>
                    <option>Banned</option>
                  </select>
                </div>

                <div className="form-group col-md-12">
                  <label>Address</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                    </div>
                    <input
                      onChange={handleInputChange}
                      value={formData.address || ""}
                      type="text"
                      name="address"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group col-md-12 text-center">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    style={{ minWidth: "200px" }}
                  >
                    Update {userType}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditUser;
