import React, { useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { addCodeData, deleteCodeData, getCodeData, updateCodeData } from '../../services/api';
import '../styles/CodeStore.css';
export default function CodeStore() {

    const [apiStatus, setApiStatus] = useState("get");
    const [filteredData, setFilteredData] = useState([]);
    const [formPopUp, setFormPopUp] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [currData, setCurrData] = useState({
        heading: "",
        code: "",
        category: ""
    });
    const [myData, setMyData] = useState([]);
    useEffect(() => {
        getCodeApi();
    }, [apiStatus])
    useEffect(() => {
        setFilteredData(myData)
    }, [myData])

    const getCodeApi = async () => {
        try {
            let codeData = await getCodeData();
            setMyData(JSON.parse(codeData));
            setApiStatus("get");
        } catch (error) {
            console.log(error.message)
        }
    }

    const searchFilter = (e) => {
        let filterData = myData.filter(item => item.heading.includes(e.target.value));
        setFilteredData(filterData);
    }

    const accordianFeature = (e) => {
        let accQue = e.target;
        let accAns = e.target.nextElementSibling;
        accQue.classList.toggle("active");
        if (accAns.style.display === "block") {
            accQue.style.borderRadius = "5px";
            accAns.style.display = "none";
        } else {
            accQue.style.borderRadius = "5px 5px 0 0";
            accAns.style.display = "block";
        }
    }

    const handleInput = (e) => {
        setCurrData({
            ...currData, [e.target.name]: e.target.value
        })
    }
    const clearCurrInput = () => {
        setCurrData({
            heading: "",
            code: "",
            category: ""
        });
        setUpdating(false);
    }
    const closeDialogBox = () => {
        setFormPopUp(false);
        clearCurrInput();
    }
    const handleSubmit = () => {
        if (updating) {
            console.log("updating");
            let response = updateCodeData(currData._id, currData);
            console.log(response);
            setUpdating(false);
            setFormPopUp(false);
            setApiStatus("update");
        }
        else {
            // setMyData([
            //     ...myData,
            //     {
            //         id: myData.length + 1,
            //         heading: currData.heading,
            //         code: currData.code,
            //         category: currData.category,
            //     }
            // ]);
            let response = addCodeData({
                heading: currData.heading,
                code: currData.code,
                category: currData.category,
            });
            console.log(response);
            setFormPopUp(false);
            clearCurrInput();
            setApiStatus("post");
        }
    }
    const updateField = (item) => {
        setCurrData(item);
        setFormPopUp(true);
        setUpdating(true);
    }
    const deleteField = (id) => {
        // let newData = myData.filter(item => item.id !== id);
        let resp = deleteCodeData(id);
        console.log(resp)
        setApiStatus("delete");
    }


    return (
        <div id='main-component' className='container-fluid'>
            <div id='main-top' className='row gap-2'>
                <input type="text" placeholder='Search...' onChange={searchFilter} className='col-md-9' />
                <button className='btn-grad col' onClick={() => setFormPopUp(true)}>Add</button>
            </div>
            {
                formPopUp ? <div className='form-popUp dialogBoxArea' style={{ zIndex: '20' }}>
                    <Icon.XCircle className='dialogBoxCross' onClick={closeDialogBox} />
                    <div className="row gap-3 mt-4">
                        <input type='text' name='heading' placeholder="Enter the Heading" onChange={handleInput} value={currData.heading} />
                        <textarea name="code" id="" cols="30" rows="10" placeholder="Enter your code" onChange={handleInput} value={currData.code}></textarea>
                        <input type='text' name='category' placeholder="Enter the Category" onChange={handleInput} value={currData.category} />
                        <button className='col-md btn-grad' onClick={handleSubmit}>Save</button>
                        <button className='col-md btn-grad btn-grad-red' onClick={clearCurrInput}>Clear</button>
                    </div>
                </div> : null
            }
            <div className="main-content row">
                <div className="code-group mt-5">
                    <h4>Work</h4>
                    {
                        filteredData ? filteredData?.map(item => {
                            return <div className="accordian-wrapper" key={item._id}>
                                <div className="accordian-question" onClick={accordianFeature}>
                                    <p>{item.heading}</p>
                                </div>
                                <div className="accordian-answer">
                                    <textarea name="" id="" value={item.code} readOnly></textarea>
                                    <div className='textarea-actions'>
                                        <Icon.PencilFill className='me-3' onClick={() => updateField(item)} />
                                        <Icon.TrashFill onClick={() => deleteField(item._id)} />
                                    </div>
                                </div>
                            </div>
                        })
                            : <h3 className='text-center mt-4'><em>~ No data Added ~</em></h3>
                    }
                </div>
            </div>
        </div>
    )
}
