import React, { Component } from 'react'
import * as Icon from 'react-bootstrap-icons';
import '../styles/CodeTip.css'

export default class CodeTip extends Component {
    constructor() {
        super();
        this.state = {
            arrowRotate: false
        }
    }
    render() {
        return (
            <div className='container'>
                <div className="row gap-2 mb-3">
                    <input className='col-md-9' type="text" placeholder='search...' />
                    <button className='col btn btn-success'>search</button>
                </div>
                <div className="row">
                    <div className="col tab-card">
                        <div className="col-md-3 tab-title w-100" data-bs-toggle="collapse" data-bs-target="#tabContent" onClick={() => this.setState({ arrowRotate: !this.state.arrowRotate })}>Items<Icon.CaretRightFill className={this.state.arrowRotate ? "rotateRight float-end mt-1" : "arrow float-end mt-1"} /></div>
                        <div className='collapse navbar-collapse' id='tabContent'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum debitis, velit accusantium mollitia porro dicta! Soluta optio, officia quas rerum ipsa omnis aliquam sapiente corporis odit dolorem iste officiis id?
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
