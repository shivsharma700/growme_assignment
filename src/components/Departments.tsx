
import { useState } from "react"

interface sub_department{
    name : string;
    isChecked : boolean,
}

interface Row {
    department : string,
    display : string,
    isChecked : boolean,
    sub_departments : sub_department[]
}

type Detail = Row[];

const Departments = () => {

    const [detail, setDetail] = useState<Detail>([
        {
          department: "customer_service",
          display: "block",
          isChecked: false,
          "sub_departments": [
            {name: "support", isChecked: false},
            {name: "customer_success", isChecked: false},
          ]
        },
        {
          department: "design",
          display: "block",
          isChecked: false,
          "sub_departments": [
            {name: "graphic_design",isChecked: false },
            {name: "product_design",isChecked: false},
            {name: "web_designs", isChecked: false}
          ]
        }
      ]
    )

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name , checked, id} = e.target
        const newDetail = detail.map((Department) => {
            if(Department.department == name){
                return {
                    ...Department,
                    isChecked : checked,
                    sub_departments : Department.sub_departments.map((sub) => {
                        return {
                            ...sub,
                            isChecked : checked
                        }
                    })
                }
            }else if (Department.department == id){
                return {
                    ...Department,
                    sub_departments : Department.sub_departments.map((sub) => {
                        if(sub.name == name){
                            return {
                                ...sub,
                                isChecked : checked
                            }
                        }else{
                            return {
                                ...sub
                            }
                        }
                    })
                }
            }
            else{
                return {
                    ...Department
                }
            }
        })
        setDetail(newDetail);
    };

    function displayItems(e: React.MouseEvent<HTMLButtonElement>){
        const  {name} = (e.target as HTMLButtonElement)
        const newDetail = detail.map((Department) => {
            if(Department.department == name){
                return {
                   ...Department,
                   display : (Department.display == "block")? "none" : "block"
                }
            } else{
                return {
                    ...Department
                }
            }
        })

        setDetail(newDetail);
    }

  return (
    <div style={{ fontSize:"1.4rem", display: "flex", justifyContent:"center" }} >
        <ul>
            {
                detail?.map((Department, index)=>(
                <li key={index} style={{listStyle:"none" }} >
                    <button onClick={displayItems} name={Department.department} style={{ fontSize:"2rem", background:"none", border:"none", cursor:"pointer" }} >
                        -
                    </button>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={Department.department}
                      checked={!Department.sub_departments.some((sub)=>sub?.isChecked !== true)}
                      onChange={handleChange}
                    />
                    <span style={{marginLeft:"1rem" }} >
                        {Department.department}
                    </span>
                    <ul style={{ display:Department.display, listStyle:"none"}} >
                        {
                            Department.sub_departments.map((subDepartment,index)=>(
                             <li key={index} style={{fontSize:"1.2rem"}} >
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name={subDepartment.name}
                                  id={Department.department}
                                  checked={subDepartment?.isChecked || false}
                                  onChange={handleChange}
                                />
                                {subDepartment.name}
                             </li>
                            ))
                        }
                    </ul>
                </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Departments