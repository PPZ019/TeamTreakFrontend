import { useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { addUser } from "../../http";
import Modal from '../../components/modal/Modal';
import { FaExclamationCircle } from "react-icons/fa";

const AddUser = () => {
  const [imagePreview, setImagePreview] = useState('/assets/icons/user.png');
  const initialState = { name: '', email: '', mobile: '', password: '', type: 'Employee', address: '', profile: '', adminPassword: '' };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, mobile, password, address, profile, type, adminPassword } = formData;

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!mobile) newErrors.mobile = "Mobile number is required";
    if (!password) newErrors.password = "Password is required";
    if (!address) newErrors.address = "Address is required";
    if (!profile) newErrors.profile = "Profile image is required";
    if (type === "Admin" && !adminPassword) newErrors.adminPassword = "Admin password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please correct the highlighted errors.");
      return;
    }

    if (formData.type === "Admin" && !showModal) {
      setShowModal(true);
      return;
    }

    const fd = new FormData();
    Object.keys(formData).forEach((key) => fd.append(key, formData[key]));

    try {
      const { success, message } = await addUser(fd);
      if (success) {
        toast.success(message);
        setShowModal(false);
        setFormData({ ...initialState });
        setImagePreview("/assets/icons/user.png");
        setErrors({});
      } else {
        toast.error(message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Server error occurred");
    }
  };

  const captureImage = (e) => {
    const file = e.target.files[0];
    setFormData((old) => ({ ...old, profile: file }));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const modalAction = () => setShowModal(!showModal);

  return (
    <>
      {showModal && (
        <Modal close={modalAction} title="Add Admin" width='35%'>
          <div className="row" style={{ margin: '20px' }}>
            <div className="col col-md-4">
              <div className="input-group justify-content-center text-center">
                <img className='rounded' src={imagePreview} width='120' alt="" />
              </div>
            </div>
            <div className="col col-md-8">
              <table className='table table-md'>
                <tbody>
                  <tr><th>Name</th><td>{formData.name}</td></tr>
                  <tr><th>Email</th><td>{formData.email}</td></tr>
                  <tr><th>User Type</th><td>{formData.type}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="form-group col-md-12">
            <label>Enter Your Password</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fas fa-lock"></i></div>
              </div>
              <input onChange={inputEvent} value={formData.adminPassword} type="password" name='adminPassword' className={`form-control ${errors.adminPassword ? 'is-invalid' : ''}`} placeholder={`Enter password to add ${formData.name} as Admin`} />
            </div>
            {errors.adminPassword && <div className="invalid-feedback d-flex align-items-center gap-1"><FaExclamationCircle className="text-danger me-1" /> {errors.adminPassword}</div>}
          </div>
          <div className="text-center mb-3">
            <button className='btn btn-primary btn-lg' type='submit' form='addUserForm' style={{ width: '30vh' }}>Add {formData.type}</button>
          </div>
        </Modal>
      )}

      <div className="main-content">
        <section className="section">
          <HeaderSection title='Add User' />
          <div className="card">
            <div className="card-body pr-5 pl-5 m-1">
              <form className='row' onSubmit={onSubmit} id='addUserForm'>
                <div className="form-group col-md-12 text-center">
                  <div className="input-group justify-content-center">
                    <input type="file" id='profile' name='profile' className="form-control d-none" onChange={captureImage} accept="image/*" />
                    <label htmlFor='profile'> <img className='rounded' src={imagePreview} width='120' alt="" /> </label>
                  </div>
                  {errors.profile && <div className="text-danger text-center mt-1"><FaExclamationCircle className="me-1" /> {errors.profile}</div>}
                </div>

                {['name', 'email', 'mobile', 'password', 'address'].map((field, i) => (
                  <div className={`form-group col-md-${field === 'address' ? '12' : '6'}`} key={i}>
                    <label>{`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className={`fas fa-${field === 'name' ? 'user' : field === 'email' ? 'envelope' : field === 'mobile' ? 'phone' : field === 'password' ? 'lock' : 'map-marker-alt'}`}></i>
                        </div>
                      </div>
                      <input onChange={inputEvent} value={formData[field]} type={field === 'email' ? 'email' : field === 'password' ? 'password' : field === 'mobile' ? 'number' : 'text'} name={field} className={`form-control ${errors[field] ? 'is-invalid' : ''}`} />
                    </div>
                    {errors[field] && <div className="invalid-feedback d-flex align-items-center gap-1"><FaExclamationCircle className="text-danger me-1" /> {errors[field]}</div>}
                  </div>
                ))}

                <div className="form-group col-md-4">
                  <label>User Type</label>
                  <select name='type' onChange={inputEvent} value={formData.type} className="form-control select2">
                    <option>Employee</option>
                    <option>Leader</option>
                    <option>Admin</option>
                  </select>
                </div>

                <div className="form-group text-center col-md-12">
                  <button className='btn btn-primary btn-lg' type='submit' style={{ width: '30vh' }}>Add {formData.type}</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddUser;