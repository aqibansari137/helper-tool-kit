import React, { Component } from 'react'
import '../styles/ClipBoard.css'

export default class ClipBoard extends Component {
    constructor() {
        super();
        this.state = {
            clipList: [],
            inpTxt: '',
            popShow: false,
            inpErr: false,
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
            newList.push(this.state.inpTxt);
            this.setState({
                clipList: newList,
                inpTxt: ''
            })
        }
    }
    clearClip = () => {
        this.setState({
            clipList: [],
            inpTxt: '',
            popShow: false,
            inpErr: false,
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
                    <button className='col-sm btn btn-success' onClick={this.addClips}>Add</button>
                    <button className='col-sm btn btn-danger' onClick={this.clearClip}>Clear</button>
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
                            : <div className="clipboard-area">
                                {this.state.clipList.map((item, i) => {
                                    return <textarea onClick={this.textCopied} readOnly key={i} value={item} />
                                })
                                }
                            </div>
                    }
                </div>
            </div>
        )
    }
}
