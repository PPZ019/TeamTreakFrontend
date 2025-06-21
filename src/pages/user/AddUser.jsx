import { useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { addUser } from "../../http";
import Modal from '../../components/modal/Modal';

<<<<<<< Updated upstream
const AddUser = () =>
{
    const [imagePreview, setImagePreview] = useState('/assets/icons/user.png');
    const initialState = {name:'',email:'',mobile:'',password:'',type:'Employee',address:'',profile:'',adminPassword:''}
    const [formData,setFormData] = useState(initialState);
    const [showModal,setShowModal] = useState(false);

    const inputEvent = (e) =>
    {
        const {name,value} = e.target;
        setFormData((old)=>
        {
            return{
                ...old,
                [name]:value
            }

        })
    }

    const onSubmit = async (e) =>
    {
        e.preventDefault();
        const {name,email,mobile,password,type,address,profile} = formData;
        if(!name || !email || !mobile || !password || !type || !address) return toast.error('All Field Required');
        if(!profile) return toast.error('Please choose an image');
        if(type==='Admin' && !showModal) {setShowModal(true); return};
        const fd = new FormData();
        Object.keys(formData).map((key)=>
        {
            return fd.append(key,formData[key]);
        })
        console.log(fd);
        const {success,message} = await addUser(fd);
        if(success)
        {
            toast.success(message)
            setShowModal(false);
            setFormData({...initialState});
            setImagePreview('/assets/icons/user.png');
        }
    }

    const captureImage = (e) =>
    {
        const file = e.target.files[0];
        setFormData((old)=>
        {
            return{
                ...old,
                profile:file
            }
=======
const AddUser = () => {
  const [imagePreview, setImagePreview] = useState("/assets/icons/user.png");

  const initialState = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    type: "Employee",
    address: "",
    profile: "",
    adminPassword: "",
  };

  const [formData, setFormData]   = useState(initialState);
  const [errors, setErrors]       = useState({});
  const [showModal, setShowModal] = useState(false);

  /* ───────── Input Handler ───────── */
  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ───────── Client‑side Validation ───────── */
  const validate = () => {
    const err = {};
    const { name, email, mobile, password, address, profile, type, adminPassword } = formData;

    if (!name)       err.name          = "Name is required";
    if (!email)      err.email         = "Email is required";
    if (!mobile)     err.mobile        = "Mobile is required";
    if (!password)   err.password      = "Password is required";
    if (!address)    err.address       = "Address is required";
    if (!profile)    err.profile       = "Profile image is required";
    if (type === "Admin" && !adminPassword) err.adminPassword = "Admin password is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ───────── Submit ───────── */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the highlighted errors.");
      return;
    }

    /* Capitalize the selected user‑type */
    const cleanedType =
      formData.type.trim().charAt(0).toUpperCase() +
      formData.type.trim().slice(1).toLowerCase();

    /* Show modal for Admin confirmation */
    if (cleanedType === "Admin" && !showModal) {
      setShowModal(true);
      return;
    }

    /* Build FormData */
    const fd = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "type") {
        fd.append("type", cleanedType);
      } else if (key === "profile") {
        /* append file only if user selected an image */
        if (val && typeof val !== "string") fd.append("profile", val);
      } else {
        fd.append(key, val);
      }
    });
>>>>>>> Stashed changes

        })
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>
        {
            setImagePreview(reader.result);
        }
    }

<<<<<<< Updated upstream
    const modalAction = () => setShowModal(showModal? false : true);

    return(
        <>

        {
            showModal && 
            <Modal close={modalAction} title="Add Admin" width='35%'>
                <div className="row"  style={{margin:'20px'}}>
                    <div className="col col-md-4">
                        <div className="input-group justify-content-center text-center">
                            <img className='rounded' src={imagePreview} width='120' alt="" /> 
                        </div>
                    </div>
                    <div className="col col-md-8">
                        <table className='table table-md'>
                            <tr>
                                <th>Name</th>
                                <td>{formData.name}</td>
                            </tr> 
                            <tr>
                                <th>Email</th>
                                <td>{formData.email}</td>
                            </tr>
                            <tr>
                                <th>User Type</th>
                                <td>{formData.type}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="form-group col-md-12">
                    <label>Enter Your Password</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-lock"></i>
                        </div>
                        </div>
                        <input onChange={inputEvent} value={formData.adminPassword} type="password" placeholder={`Enter Your Password To Add ${formData.name} As An Admin`} id='adminPassword' name='adminPassword' className="form-control"/>
                    </div>
                </div>
                <div className="justify-content-center text-center mb-3">
                    <button className='btn btn-primary btn-lg' type='submit' form='addUserForm' style={{width:'30vh'}}>Add {formData.type}</button>
                </div>
            </Modal>
        }

        <div className="main-content">
        <section className="section">
            <HeaderSection title='Add User'/>
                <div className="card">
                  <div className="card-body pr-5 pl-5 m-1">
                    <form className='row' onSubmit={onSubmit} id='addUserForm'>
                        <div className="form-group col-md-12 text-center">
                            <div className="input-group justify-content-center">
                                <input type="file" id='profile' name='profile' className="form-control d-none" onChange={captureImage} accept="image/*" />
                                <label htmlFor='profile'> <img className='rounded' src={imagePreview} width='120' alt="" /> </label>
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label>Enter Name</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.name} type="text" id='name' name='name' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label>Enter Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.email} type="email" id='email' name='email' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label>Enter Mobile Number</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-phone"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.mobile} type="number" id='mobile' name='mobile' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label>Enter Password</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.password} type="password" id='password' name='password' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-4">
                            <label>User Type</label>
                            <select name='type' onChange={inputEvent} value={formData.type} className="form-control select2">
                                <option>Employee</option>
                                <option>Leader</option>
                                <option>Admin</option>
                            </select>
                        </div>

                        <div className="form-group col-md-12 ">
                            <label>Enter Address</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.address} type="text" id='address' name='address' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group text-center col-md-12">
                            <button className='btn btn-primary btn-lg' type='submit' style={{width:'30vh'}}>Add {formData.type}</button>
                        </div>

                    </form>
                  </div>
                </div>
        </section>
=======
  /* ───────── Image Capture ───────── */
  const captureImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, profile: file }));
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* ---------- Admin Password Modal ---------- */}
      {showModal && (
        <Modal close={() => setShowModal(false)} title="Confirm Admin Password" width="35%">
          <div className="p-5 bg-white text-black rounded space-y-4">
            <div className="flex gap-6">
              <img className="rounded w-28 h-28 object-cover border" src={imagePreview} alt="Preview" />
              <div className="text-sm space-y-1">
                <p><strong>Name:</strong>  {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Type:</strong>  {formData.type}</p>
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm mb-1 block">Admin Password</label>
              <input
                type="password"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={inputEvent}
                placeholder="Enter password"
                className={`pl-3 py-2 w-full rounded border text-black ${
                  errors.adminPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.adminPassword && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.adminPassword}
                </p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                form="addUserForm"
                className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
              >
                Add Admin
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ---------- Main Form ---------- */}
      <div className="p-6">
        <HeaderSection title="Add New User" />

        <form onSubmit={onSubmit} id="addUserForm" className="max-w-3xl mx-auto bg-white shadow rounded-lg p-8 space-y-6">
          {/* Profile image */}
          <div className="flex justify-center">
            <input
              id="profile"
              name="profile"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={captureImage}
            />
            <label htmlFor="profile" className="cursor-pointer">
              <img
                src={imagePreview}
                alt="User"
                className="rounded-full w-28 h-28 object-cover border-4 border-blue-900"
              />
            </label>
          </div>
          {errors.profile && (
            <p className="text-red-600 text-sm text-center">
              <FaExclamationCircle className="inline mr-1" /> {errors.profile}
            </p>
          )}

          {/* Text fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["name", "email", "mobile", "password", "address"].map((field) => (
              <div key={field} className={field === "address" ? "md:col-span-2" : ""}>
                <label className="block text-sm font-medium capitalize">Enter {field}</label>
                <input
                  name={field}
                  type={
                    field === "email"    ? "email"    :
                    field === "password" ? "password" :
                    field === "mobile"   ? "tel"      :
                    "text"
                  }
                  value={formData[field]}
                  onChange={inputEvent}
                  className={`mt-1 w-full px-4 py-2 border rounded text-black ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <FaExclamationCircle /> {errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* User Type */}
          <div className="md:w-1/2">
            <label className="block text-sm font-medium mb-1">User Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={inputEvent}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            >
              <option>Employee</option>
              <option>Leader</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-2 rounded-lg text-lg shadow"
            >
              Add {formData.type.charAt(0).toUpperCase() + formData.type.slice(1).toLowerCase()}
            </button>
          </div>
        </form>
>>>>>>> Stashed changes
      </div>
      </>
    )
}

export default AddUser;