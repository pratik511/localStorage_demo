import React, { useState } from 'react'

const Democheckbox = () => {

    const [check, setCheck] = useState({
        hobby: []
    })

    const [checkeds, setCheckeds] = useState(false)


    console.log("check", check);




    
    const checkHandler = (event) => {
        // setCheckeds(!checkeds)
        // const { name, value } = e.target;

        // if (value) {
        //     if (checkeds) {
        //         setCheck({ ...check, [name]: value });
        //         const box = [...check.hobby, value]
        //          setCheck({ ...check, [name]: box })
        //     } else {
        //         const filterCheck = check?.hobby.filter(item => item !== value);
        //         // const store = [...check.hobby, filterCheck];
        //          setCheck({ ...check, [name]: filterCheck })
        //     }
        // }


        let newArray = [...check.hobby, event.target.value];
        if (check.hobby.includes(event.target.value)) {
          newArray = newArray.filter(day => day !== event.target.value);
        }
        setCheck({
            hobby : newArray
        });


    }


    return (

        <>
            <h1>Hello</h1>
            <div>
                <h1>Show Checkboxes</h1>

                {/* <form> */}
                    <input type="checkbox" id="vehicle1" name="hobby" value="Bike" onChange={(e) => checkHandler(e)} />
                    <label for="vehicle1"> I have a bike</label><br />

                    <input type="checkbox" id="vehicle2" name="hobby" value="Car" onChange={(e) => checkHandler(e)} />
                    <label for="vehicle2"> I have a car</label><br />

                    <input type="checkbox" id="vehicle3" name="hobby" value="Boat" onChange={(e) => checkHandler(e)} />
                    <label for="vehicle3"> I have a boat</label><br /><br />

                    <button type='submit'>Submit</button>
                {/* </form> */}
            </div>
        </>
    )
}

export default Democheckbox