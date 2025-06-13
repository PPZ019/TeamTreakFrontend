import { NavLink } from "react-router-dom";

const RowAdmin = ({index,data}) =>
{
    return(
        <tr>
            <td>{index}</td>
            {/* <td><figure className="avatar"> <img src={data.image} alt={data.name}/> </figure></td> */}
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.mobile}</td>
            <td><div className={`badge ${data.status==='Active' ? 'bg-green-100 text-green-700' :'badge-danger'}`}>{data.status}</div></td>
            <td><NavLink to={`/admin/${data.id}`} className="bg-[#F0F1FF] hover:bg-[#B5A8D5] text-[#211C84] px-3 py-1 font-light rounded hover:no-underline">Detail</NavLink></td>
        </tr>
    );
}

export default RowAdmin;