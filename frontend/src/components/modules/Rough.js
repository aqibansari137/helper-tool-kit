import React, { Component } from 'react'
import * as Icon from 'react-bootstrap-icons';
export default class Rough extends Component {
    render() {
        return (
            <div>
                <div className='container container-fluid'>
                    <div className='row my-3 justify-content-space-between'>
                        <h2 className='col-md-9'>Clean your code + get a helping hand</h2>
                        <button type="button" data-bs-toggle="collapse" data-bs-target="#opContent" aria-controls="opContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <button className="col-md-3 btn-grad" data-bs-toggle="collapse" data-bs-target="#opContent">Operations <Icon.CaretRightFill className='arrow' /></button>
                    </div>
                    <div className='collapse navbar-collapse' id='opContent'>
                        <div className='row mb-3 gap-2'>
                            <button className='col btn-grad'>Remove nbsp</button>
                            <button className='col btn-grad'>Create Reference</button>
                            <button className='col btn-grad'>Create Bullet point</button>
                        </div>
                        <div className="row mb-3 gap-2">
                            <input type="text" className='col-md-8' placeholder='Enter the html tag to be removed eg: sup' name="rmtag" id="" />
                            <button className='col btn-grad'>Remove tags</button>
                        </div>
                        <div className="row mb-3 gap-2">
                            <input type="text" className='col-md' placeholder='Find' name="findStr" id="" />
                            <input type="text" className='col-md' placeholder='Replace' name="replStr" id="" />
                            <button className='col-md btn-grad'>Replace String</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
