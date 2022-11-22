import React, { Component } from 'react'
import * as Icon from 'react-bootstrap-icons';

export default class Task extends Component {
    constructor() {
        super();
        this.state = {
            id: 1,
            taskinp: '',
            taskList: [],
            inpErr: false,
            editEnable: false,
            editValue: '',
            editId: ''
        }
    }
    componentDidUpdate = () => {
        localStorage.setItem("TaskList", JSON.stringify({
            id: this.state.id,
            taskList: this.state.taskList
        }))
    }
    componentDidMount = () => {
        if (localStorage.getItem("TaskList") !== null) {
            let data = JSON.parse(localStorage.getItem("TaskList"))
            this.setState({
                id: data.id,
                taskList: data.taskList
            })
        }
    }
    clearTask = () => {
        this.setState({
            id: 1,
            taskinp: '',
            taskList: [],
            inpErr: false
        })
    }
    handleInp = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            inpErr: false
        })

    }
    inpvalid = () => {
        if (this.state.taskinp === '') {
            this.setState({
                inpErr: true
            })
            setTimeout(() => {
                this.setState({
                    inpErr: false
                })
            }, 2000)
            return false;

        }
        return true;
    }
    addTask = () => {
        if (this.inpvalid()) {

            let taskList = this.state.taskList;
            let tsk = this.state.taskinp;
            let newTask = {
                id: this.state.id,
                name: tsk,
                status: 'open'
            }
            taskList.push(newTask)
            this.setState({
                id: this.state.id + 1,
                taskList,
                taskinp: ''
            })
        }
    }
    deleteTask = (id) => {
        let newList = this.state.taskList.filter(item => item.id !== id);
        this.setState({
            taskList: newList
        })

    }
    statusUpdate = (id, e) => {
        let newData = this.state.taskList;
        // eslint-disable-next-line array-callback-return
        newData.map(x => {
            if (x.id === id) {
                x.status = e.target.value
            }
        })
        this.setState({
            taskList: newData
        })
    }
    enableEdit = (id) => {
        let data = this.state.taskList.filter(x => x.id === id)
        if (data[0].status !== "completed") {

            this.setState({
                editEnable: true,
                editValue: data[0].name,
                editId: data[0].id
            })
        }
    }
    submitEdit = (id) => {
        let newData = this.state.taskList;
        // eslint-disable-next-line array-callback-return
        newData.map(x => {
            if (x.id === id) {
                x.name = this.state.editValue
            }
        })
        this.setState({
            editEnable: false,
            taskList: newData
        })
    }
    render() {
        return (
            <div className="container taskStyle">
                <h2 className='row my-3'>Keep tasks at one place</h2>
                <div className="row addContent gap-2">
                    {
                        this.state.inpErr ?
                            <div className="alert alert-danger" role="alert">
                                Please provide an input to proceed
                            </div>
                            : ""
                    }
                    <input className='col-sm-9' type="text" name="taskinp" placeholder="Enter the task" value={this.state.taskinp} onChange={(e) => this.handleInp(e)} />
                    <button className='col btn btn-success' onClick={this.addTask}>Add</button>
                    <button className='col btn btn-danger' onClick={this.clearTask}>Clear</button>
                </div>
                {
                    this.state.taskList.length === 0 ? <h5 className="my-4 text-center">No Task Added</h5>
                        : <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className='col-1'>#</th>
                                    <th scope="col" className='col-5'>Task</th>
                                    <th scope="col" className='col-5'>Status</th>
                                    <th scope="col" className='col-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.taskList.map((item, index) => {
                                        return <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            {
                                                this.state.editEnable && this.state.editId === item.id ?
                                                    <td><input type="text" name='editValue' value={this.state.editValue} onChange={(e) => this.handleInp(e)} /></td>
                                                    :
                                                    <td className={item.status === 'completed' ? "text-decoration-line-through" : ""}>{item.name}</td>
                                            }
                                            {/* <td className={item.status ? "text-success" : "text-danger"}>{item.status ? "Done" : "Pending"}</td> */}
                                            <td><select className="form-select" name="" id="" value={item.status} onChange={(e) => this.statusUpdate(item.id, e)}>
                                                <option value="open">open</option>
                                                <option value="in progress">in progress</option>
                                                <option value="completed">completed</option>
                                                <option value="blocked">blocked</option>
                                            </select></td>
                                            <td>
                                                <div className='pt-2 d-flex align-items-center justify-content-evenly'>
                                                    {
                                                        this.state.editEnable && this.state.editId === item.id ?
                                                            <Icon.CheckSquare onClick={() => this.submitEdit(item.id)} data-bs-toggle="tooltip" title="save" />
                                                            :
                                                            <Icon.PencilSquare onClick={() => this.enableEdit(item.id)} data-bs-toggle="tooltip" title="edit" style={item.status === "completed" ? { color: 'grey', opacity: '0.5' } : {}} />
                                                    }
                                                    <Icon.Trash className='pe-auto' onClick={() => this.deleteTask(item.id)} data-bs-toggle="tooltip" title="delete" />
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                }

            </div>
        )
    }
}
