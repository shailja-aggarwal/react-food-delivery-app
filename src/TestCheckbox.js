import { useState } from "react";

const TestCheckbox = () => {

    const [list, setList] = useState([{name:'1', checked: false, id:1}, {name:'2', checked: false, id:2}, {name:'3', checked: false, id:3}])
    const [isAllChecked, setIsAllChecked] = useState(false);

    const handleSelectAll = (event) => {
        debugger
        setIsAllChecked(event.target.checked);

        setList((prev) => {
           const newVal = prev.map(e => {
            return {...e, checked : event.target.checked}
        })
           return newVal
        })
    }

    const updateIndivisual = (item) => {
        let tempList = [...list];
        debugger
        const indx = tempList.findIndex((e) => e.id == item.id);
        if(indx>-1){
            tempList[indx].checked = !tempList[indx].checked
            setList(tempList)
        } 
    }

    const itemsList = list.map(item => {
        return(
            <div>
                <label>{item.name}</label>
                <input type = "checkbox" checked = {item.checked} onChange={() => {updateIndivisual(item)}}/>
            </div>

        )
     })

    return(
        <div>
            <input type = "checkbox" onChange = {handleSelectAll.bind(this)}/>
            <label>CheckAll</label>
                { itemsList}
        </div>
    )

}

export default TestCheckbox;