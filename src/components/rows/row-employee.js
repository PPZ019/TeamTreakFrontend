import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


const RowEmployee = ({index,data}) =>
{
    const {user} = useSelector(state => state.authSlice); 
    console.log(user)
    return(
        <tr className="text-md font-light text-center">
            <td>{index}</td>
            {/* <td><figure className="avatar"> <img src={data.image} alt={data.name}/> </figure></td> */}
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.mobile}</td>
            <td><div className={`text-center p-2 rounded text-xs  ${data.status==='Active'  ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700'}`}>{data.status}</div></td>
            
            {
                user.type==="Admin"?
                (<td>
                { data.team ?
                    <NavLink to={`/team/${data.team.id}`} className='badge  badge-primary' style={{padding:'0px 10px 0px 0px'}}>
                    <img src={data.team.image} className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/>
                    {data.team.name}
                </NavLink>
                :
                <div className='badge  badge-light' style={{padding:'0px 10px 0px 0px'}}>
                    <img src='./assets/icons/team.png' className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/>
                    No Team
                </div> }
            </td>)
            :""
            }
            {
                user.type==="Admin"?
                (<td><NavLink to={`/employee/${data.id}`} className="bg-[#F0F1FF] hover:bg-[#B5A8D5] text-[#211C84] px-3 py-1 font-light rounded ">Detail</NavLink></td>)
                :""
            }
        </tr>
    );
}

export default RowEmployee;