import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState()
    const [inputval, setInputVal] = useState('')

    const navigate = useNavigate()
    useEffect(() => {
        getTable()
    }, [])

    const getTable = () => {
        const all = JSON.parse(localStorage.getItem("Alldata"));
        setData(all)
    }
    
    const onDelete = (item) => {
        console.log("item", item);
        const dataDummy = data && data.filter((i) => (i.id !== item.id))
        localStorage.setItem("Alldata", JSON.stringify(dataDummy));
        getTable()
    }
    const onEdit = (item) => {
        navigate(`/login/${item.id}`,{state:item})
    }

    const fileName = ({Name}) =>{
        return Name.toLowerCase().indexOf(inputval.toLowerCase()) !== -1
    }

    return (
        <div className='container'>
            <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/login')}>Login Page</button>
            <br/>
            <br/>
            <input  style={{width:"25%",height:"40px"}} type='search' value={inputval} placeholder="Search" onChange={(e) => setInputVal(e.target.value)} />
            <br/>
            <br/>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className='text-center' scope="col">Id</th>
                        <th className='text-center' scope="col">Name</th>
                        <th className='text-center' scope="col">Age</th>
                        <th className='text-center' scope="col">Phone</th>
                        <th className='text-center' scope="col">Gender</th>
                        <th className='text-center' scope="col">Hobby</th>
                        <th className='text-center' scope="col">Action</th>
                    </tr>
                </thead>

                {data && data.filter(fileName).length > 0 ? data.filter(fileName).map((item, index) =>
                    <tbody>
                        <tr>
                            <th className='text-center' scope="row">{index + 1}</th>
                            <td>{item.Name}</td>
                            <td>{item.Age}</td>
                            <td>{item.Phone}</td>
                            <td>{item.Gender}</td>
                            <td>{item.Hobby.map((element, i) => (element + "  "))}</td>
                            <td style={{ padding: "2px 0 0 0" }}><button type="button" className="btn btn-outline-primary btn-sm" onClick={() => onEdit(item)}>Edit</button>
                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onDelete(item)}>Delete</button></td>
                        </tr>
                    </tbody>
                )
                    : <div>
                        <h1 className='text-center'>Not Found</h1>
                    </div>
            }
            </table>
        </div>
    )
}

export default Home