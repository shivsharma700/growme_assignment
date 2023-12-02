import { TextField, Button } from "@mui/material"
import {useState} from "react";
import { useNavigate } from "react-router-dom";

interface form{
    Name : string,
    Phone : string,
    Email : string
}

const Home = () => {

    const [detail , setDetail] = useState<form>({Name : "", Phone : "", Email : ""})
    const [buttonClicked, setButtonClicked] = useState(false);

    const navigate = useNavigate()

    function onSetDetail(e: React.ChangeEvent<HTMLInputElement>){
        const {placeholder, value}  =  e.target;
        setDetail ({
            ...detail,
            [placeholder] : value
        })
    }

    function setFormToLocalStorage(){
        setButtonClicked(true);
        if(detail.Name.length == 0 || detail.Phone.length == 0 || detail.Email.length == 0){
            alert("you must have to  enter the detail before accessing to the next page.")
            return
        }
        localStorage.setItem('detail', JSON.stringify(detail));
        // console.log(JSON.parse(localStorage.getItem('detail')));
        navigate("/secondPage");
    }

  return (
    // form
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"80vh",  }} >
        <div style={{boxShadow:"2px 5px 10px red", borderRadius:"1rem", display:"flex", flexDirection: 'column', justifyContent:"center", alignItems:"center", gap: "2rem", width:"30rem", height:"20rem" , backgroundColor:"white"  }} >

        <TextField
          style={{width:"70%", height:"2.5rem", }}
          error={buttonClicked && detail.Name.length == 0}
          id="outlined-required"
          label={(buttonClicked && detail.Name.length == 0 ) ? "Name" : ""}
          placeholder="Name"
          onChange={onSetDetail}
          />

         <TextField
          style={{width:"70%", height:"2.5rem" }}
          error={buttonClicked && detail.Phone.length == 0}
          id="outlined-required"
          label={(buttonClicked && detail.Phone.length == 0 ) ? "Phone" : ""}
          placeholder="Phone"
          onChange={onSetDetail}
        />

         <TextField
          style={{width:"70%", height:"2.5rem" }}
          error={buttonClicked && detail.Email.length == 0}
          id="outlined-required"
          label={(buttonClicked && detail.Email.length == 0 ) ? "Email" : ""}
          placeholder="Email"
          onChange={onSetDetail}
        />

        <Button onClick={setFormToLocalStorage} variant="contained" color="success">
          Submit
        </Button>

        </div>
    </div>
  )
}

export default Home