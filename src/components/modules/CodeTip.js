/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import * as Icon from 'react-bootstrap-icons';
import '../styles/CodeTip.css'

export default class CodeTip extends Component {
    constructor() {
        super();
        this.state = {
            arrowRotate: -1,
            tipsList: [
                {
                    id: 0,
                    title: 'Format a date in javascript',
                    description: "Below is the code to format a date in javascript",
                    code: "let newDate = new Date(myDate)\n newDate= `${('0' + myDate.getDate()).slice(-2)}/${('0' + (myDate.getMonth() + 1)).slice(-2)}/${myDate.getFullYear()}`",
                },
                {
                    id: 1,
                    title: 'Tips Title',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni molestias sint animi odio et nam assumenda',
                    code: '',
                },
                {
                    id: 1,
                    title: 'Tips Title',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni molestias sint animi odio et nam assumenda',
                    code: '',
                },
            ]
        }
    }
    rotateArrow = (i) => {
        let arrw = this.state.arrowRotate === i ? -1 : i;
        this.setState({
            arrowRotate: arrw
        })

    }
    render() {
        return (
            <div className='container'>
                <h2 className='row my-3'>Tips for Code</h2>
                <div className="row gap-2 mb-3">
                    <input className='col-md-9' type="text" placeholder='search...' />
                    <button className='col btn btn-success'>search</button>
                </div>
                {
                    this.state.tipsList.map((item, i) => {
                        return <div className="card mb-3 row" key={i}>
                            <div className="card-header bg-success" onClick={() => this.rotateArrow(i)}>
                                <div className="d-flex justify-content-between align-items-center">
                                    {item.title}
                                    <Icon.CaretRightFill style={{
                                        display: "inline-block",
                                        transform: this.state.arrowRotate === i ? "rotate(90deg)" : "",
                                        transition: "transform 500ms"
                                    }}
                                    />
                                </div>
                            </div>
                            <div className={this.state.arrowRotate === i ? 'p-0 tabHide' : 'p-0 tabShow'} id={`tips${i}`}>

                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                    {
                                        item.code !== "" ? <pre><code>{item.code}</code></pre> : ""
                                    }
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }
}
