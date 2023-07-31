/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import '../styles/ClipBoard.css'
import * as Icon from 'react-bootstrap-icons';

export default class ClipBoard extends Component {
    constructor() {
        super();
        this.state = {
            clipList: [],
            inpTxt: '',
            popShow: false,
            inpErr: false,
            listID: 1
        }
    }
    componentDidUpdate = () => {
        localStorage.setItem("ClipList", JSON.stringify({
            listID: this.state.listID,
            clipList: this.state.clipList
        }))
    }
    componentDidMount = () => {
        if (localStorage.getItem("ClipList") !== null) {
            let data = JSON.parse(localStorage.getItem("ClipList"))
            this.setState({
                listID: data.listID,
                clipList: data.clipList
            })
        }
    }
    inpvalid = () => {
        if (this.state.inpTxt === '') {
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
    inpTxtHandler = (e) => {
        let name = e.target.name;
        this.setState({
            [name]: e.target.value,
            inpErr: false
        })
    }
    textCopied = (e) => {
        navigator.clipboard.writeText(e.target.value)
        this.setState({
            popShow: true
        })
        setTimeout(() => {
            this.setState({
                popShow: false
            })
        }, 500)
    }
    addClips = () => {
        if (this.inpvalid()) {
            let newList = this.state.clipList;
            newList.push({
                id: this.state.listID,
                data: this.state.inpTxt
            });
            this.setState({
                clipList: newList,
                inpTxt: '',
                listID: this.state.listID + 1
            })
        }
    }
    delClip = (id) => {
        let currList = this.state.clipList;
        currList = currList.filter((item) => {
            return item.id !== id
        })
        this.setState({
            clipList: currList
        })
        console.log(id)
    }
    clearClip = () => {
        this.setState({
            clipList: [],
            inpTxt: '',
            popShow: false,
            inpErr: false,
            listID: 1
        })
    }

    render() {
        return (
            <div className='container'>
                <h2 className='row my-3'>Clipboard</h2>
                {
                    this.state.inpErr ?
                        <div className="row alert alert-danger" role="alert">
                            Please provide an input to proceed
                        </div>
                        : ""
                }
                <div className="row gap-3">
                    <input type="text" className='col-md-8' name='inpTxt' onChange={this.inpTxtHandler} value={this.state.inpTxt} placeholder='Enter something you want to keep on clipbord' />
                    <button className='col-sm btn-grad' onClick={this.addClips}>Add</button>
                    <button className='col-sm btn-grad btn-grad-red' onClick={this.clearClip}>Clear</button>
                </div>
                <div className="row my-3">
                    {
                        this.state.popShow ?
                            <div className="alert alert-success" role="alert">
                                Text copied
                            </div>
                            : ""
                    }
                    {
                        this.state.clipList.length === 0 ? <h3 className='text-center'>No clips added</h3>
                            : <div className="clipboard-area">{
                                this.state.clipList.map((item, i) => {
                                    return <div key={i}>
                                        <textarea onClick={this.textCopied} readOnly value={item.data} />
                                        <Icon.Trash className='delList' onClick={() => this.delClip(item.id)}></Icon.Trash>
                                    </div>
                                })
                            }</div>
                    }
                </div>
            </div>
        )
    }
}
