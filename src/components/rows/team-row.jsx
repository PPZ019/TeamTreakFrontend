import { NavLink } from "react-router-dom";

const RowTeam = ({index,data}) =>
{
    return(
        <tr>
            <td>{index}</td>
            {/* <td><figure className="avatar"> <img src={data.image} alt={data.name}/> </figure></td> */}
            <td>{data.name}</td>
            <td>
                { data.leader ?
                    <NavLink to='/' className='badge  badge-primary' style={{padding:'0px 10px 0px 0px'}}>
                    <img src={data.leader.image} className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/>
                    {data.leader.name}
                </NavLink>
                :
                <div className='badge  badge-light' style={{padding:'0px 10px 0px 0px'}}>
                    <img src='/assets/icons/user.png' className='avatar avatar-sm mr-2' alt="data" width="96" height="96"/>
                    No Leader
                </div> }
            </td>
            <td><div className={`badge ${data.status==='Active' ? 'bg-green-100 text-green-700' :'badge-danger'}`}>{data.status}</div></td>
            <td><NavLink to={`/team/${data.id}`} className="bg-[#F0F1FF] hover:bg-[#B5A8D5] text-[#211C84] px-3 py-1 font-light rounded hover:no-underline">Detail</NavLink></td>
        </tr>
    );
}

export default RowTeam;