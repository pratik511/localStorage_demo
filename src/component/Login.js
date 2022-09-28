import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("location", location.state);
    const [data, setData] = useState({
        id: Math.random(),
        Name: "",
        Age: "",
        Phone: "",
        Gender: "",
        Hobby: []
    })
    const [error, setError] = useState({
        nameError: "",
        ageError: "",
        phoneError: "",
        genderError: "",
        hobbyError: ""
    });

    useEffect(() => {
        if (location?.state !== null) {
            setData(location?.state)
        }
    }, [])



    const pattern = /[^A-Za-z_./ /]/;

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === "Hobby") {
            let dummyArray = [...data.Hobby, value]
            if (data.Hobby.includes(value)) {
                dummyArray = dummyArray.filter((item) => item !== value)
            }
            setData({ ...data, Hobby: dummyArray });
        }
        else {
            setData({ ...data, [name]: value })
        }
        validation(name, value);
    }

    const validation = (name, value) => {
        if (name === "Name") {
            if (!value) {
                setError({ ...error, nameError: "Name is Required!" })
            }
            else if (value.match(pattern)) {
                setError({ ...error, nameError: "Name Not Allow Number & Symbol!" });
            }
            else {
                setError({ ...error, nameError: "" })
            }
        }
        else if (name === "Age") {
            if (!value) {
                setError({ ...error, ageError: "Age is Required!" })
            }
            else if (value.length > 3) {
                setError({ ...error, ageError: "Age is Maximum Three Digit!" })
            }
            else {
                setError({ ...error, ageError: "" })
            }
        }
        else if (name === "Phone") {
            if (!value) {
                setError({ ...error, phoneError: "Phone is Required!" })
            }
            else if (value.length > 10 || value.length < 10) {
                setError({ ...error, phoneError: "Phone Number is Ten Digit!" })
            }
            else {
                setError({ ...error, phoneError: "" })
            }
        }
        else if (name === "Gender") {
            if (!value) {
                setError({ ...error, genderError: "Gender is Required!" })
            }
            else {
                setError({ ...error, genderError: "" })
            }
        }
        else if (name === "Hobby") {
            if (!value) {
                setError({ ...error, hobbyError: "Hobby is Required!" })
            }
            else {
                setError({ ...error, hobbyError: "" })
            }
        }
    }

    const onEdit = () => {
        if (data.Name === "" && data.Age === "" && data.Phone === "" && data.Gender === "" && data.Hobby.length === 0) {
            setError({ ...error, nameError: "Name is Required!", ageError: "Age is Required!", phoneError: "Phone is Required!", genderError: "Gender is Required!", hobbyError: "Hobby is Required!" })

        }
        else if (data.Name === "") {
            setError({ ...error, nameError: "Name is Required!" })
        }
        else if (data.Age === "") {
            setError({ ...error, ageError: "Age is Required!" })
        }
        else if (data.Phone === "") {
            setError({ ...error, phoneError: "Phone is Required!" })
        }
        else if (data.Gender === "") {
            setError({ ...error, genderError: "Gender is Required!" })
        }
        else if (data.Hobby.length === 0) {
            setError({ ...error, hobbyError: "Hobby is Required!" })
        }
        else {
            if (location?.state !== null) {
                const getdata = JSON.parse(localStorage.getItem("Alldata"))
                const filter = getdata.findIndex((i) => i.id === location?.state?.id)
                getdata[filter] = data
                localStorage.setItem("Alldata", JSON.stringify(getdata))
                navigate('/')
            }
        }
    }

    const onSubmit = () => {
        if (data.Name === "" && data.Age === "" && data.Phone === "" && data.Gender === "" && data.Hobby.length === 0) {
            setError({ ...error, nameError: "Name is Required!", ageError: "Age is Required!", phoneError: "Phone is Required!", genderError: "Gender is Required!", hobbyError: "Hobby is Required!" })

        }
        else if (data.Name === "") {
            setError({ ...error, nameError: "Name is Required!" })
        }
        else if (data.Age === "") {
            setError({ ...error, ageError: "Age is Required!" })
        }
        else if (data.Phone === "") {
            setError({ ...error, phoneError: "Phone is Required!" })
        }
        else if (data.Gender === "") {
            setError({ ...error, genderError: "Gender is Required!" })
        }
        else if (data.Hobby.length === 0) {
            setError({ ...error, hobbyError: "Hobby is Required!" })
        }
        else {
            const all = JSON.parse(localStorage.getItem("Alldata")) || [];
            localStorage.setItem("Alldata", JSON.stringify([...all, data]));
            navigate("/")
        }
    }

    return (
        <>
            <div className="container">
                <h1>{location?.state?.id ? "Edit User" : "Login User"}</h1>
                <div>
                    <label>Name:</label>
                    <input type="text" className="form-control" value={data.Name || ""} name="Name" onChange={(e) => onChangeValue(e)} />
                </div>
                <div>
                    {error.nameError !== "" && (
                        <p className="m-0" style={{ color: "red" }}>
                            {error.nameError}
                        </p>
                    )}
                </div>
                <div>
                    <label>Age:</label>
                    <input type="number" className="form-control" value={data.Age || ""} name="Age" onChange={(e) => onChangeValue(e)} />
                </div>
                <div>
                    {error.ageError !== "" && (
                        <p className="m-0" style={{ color: "red" }}>
                            {error.ageError}
                        </p>
                    )}
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="number" className="form-control" value={data.Phone || ""} name="Phone" onChange={(e) => onChangeValue(e)} />
                </div>
                <div>
                    {error.phoneError !== "" && (
                        <p className="m-0" style={{ color: "red" }}>
                            {error.phoneError}
                        </p>
                    )}
                </div>
                <div>
                    <label>Gender:</label>
                    <div className="d-flex justify-content-center" >
                        <div className="form-check">
                            <input className="form-check-input" value="Male" checked={data.Gender === "Male" ? true : false} type="radio" name="Gender" onChange={(e) => onChangeValue(e)} id="flexRadioDisabled" />
                            <label className="form-check-label ms-2" for="flexRadioDisabled">
                                Male
                            </label>
                        </div>
                        <div className="form-check ms-3">
                            <input className="form-check-input" type="radio" value="Female" checked={data.Gender === "Female" ? true : false} name="Gender" onChange={(e) => onChangeValue(e)} id="flexRadioCheckedDisabled" />
                            <label className="form-check-label ms-2" for="flexRadioCheckedDisabled">
                                Female
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    {error.genderError !== "" && (
                        <p className="m-0" style={{ color: "red" }}>
                            {error.genderError}
                        </p>
                    )}
                </div>
                <div>
                    <label>Hobby:</label>
                    <div className="d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Movie" checked={data.Hobby.includes("Movie") ? true : false} id="flexCheckChecked" name='Hobby' onChange={(e) => onChangeValue(e)} />
                            <label className="form-check-label me-3" for="flexCheckChecked">
                                Movie
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Criket" checked={data.Hobby.includes("Criket") ? true : false} id="flexCheckChecked" name='Hobby' onChange={(e) => onChangeValue(e)} />
                            <label className="form-check-label me-3" for="flexCheckChecked">
                                Criket
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="VideoGame" checked={data.Hobby.includes("VideoGame") ? true : false} id="flexCheckChecked" name='Hobby' onChange={(e) => onChangeValue(e)} />
                            <label className="form-check-label me-3" for="flexCheckChecked">
                                Video Game
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    {error.hobbyError !== "" && (
                        <p className="m-0" style={{ color: "red" }}>
                            {error.hobbyError}
                        </p>
                    )}
                </div>

                <button type="button" className="btn btn-primary" onClick={() => location?.state !== null ? onEdit() : onSubmit()}>Submit</button>

            </div>
        </>
    )
}

export default Login