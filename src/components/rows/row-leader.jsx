import { NavLink } from "react-router-dom";

const RowLeader = ({index,data}) =>
{
    return(
        <tr className="font-light text-center">
            <td>{index}</td>
            {/* <td><figure className="avatar"> <img src={data.image} alt={data.name}/> </figure></td> */}
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.mobile}</td>
            <td>{data.company.name}</td>
            <td><div className={`badge ${data.status==='Active' ? 'bg-green-100 text-green-700' :'badge-danger'}`}>{data.status}</div></td>
            {/* <td>
                { data.team && Object.keys(data.team).length!==0 ?
                    <NavLink to={`/team/${data.team.id}`} className='badge  badge-primary' style={{padding:'0px 10px 0px 0px'}}>
                    <img src={data.team.image} className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/>
                    {data.team.name}
                </NavLink>
                :
                <div className='badge  badge-light' style={{padding:'0px 10px 0px 0px'}}>
                    <img src='/assets/icons/team.png' className='avatar avatar-sm mr-2' alt="Person" width="96" height="96"/>
                    No Team
                </div> }
            </td> */}
            <td><NavLink to={`/employee/${data.id}`} className="bg-[#F0F1FF] hover:bg-[#B5A8D5] text-[#211C84] px-3 py-1 font-light rounded hover:no-underline">Detail</NavLink></td>
        </tr>
    );
}

export default RowLeader;