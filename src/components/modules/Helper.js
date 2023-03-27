import React, { Component } from 'react'
import * as Icon from 'react-bootstrap-icons';

export default class Helper extends Component {
    constructor() {
        super();
        this.state = {
            inpTxt: '',
            outTxt: '',
            rmtag: '',
            findStr: '',
            replStr: '',
            popShow: false,
            opShow: false,
            inpErr: false,
            arrowRotate: false,
            timer: 2000,
            showDialogBox: false,
            inpDialog: '',
            inpDialogErr: false
        }
    }
    inpTxtHandler = (e) => {
        let name = e.target.name;
        this.setState({
            [name]: e.target.value,
            inpErr: false
        })
    }
    inpvalid = (type = 'default') => {
        let errtype = (type === 'dialog') ? 'inpDialogErr' : 'inpErr';
        if (this.state.inpTxt === '') {
            this.setState({
                [errtype]: true
            })
            setTimeout(() => {
                this.setState({
                    [errtype]: false
                })
            }, this.state.timer)
            return false;

        }
        return true;
    }
    removeNbspFunc = () => {
        if (this.inpvalid()) {
            let str1 = this.state.inpTxt;
            str1 = str1.replaceAll("&nbsp;", " ");
            let str1Arr = str1.split(" ");
            // eslint-disable-next-line array-callback-return
            str1Arr = str1Arr.filter(item => {
                if (item !== " ")
                    return item;
            })
            str1 = str1Arr.join(" ");
            this.setState({
                outTxt: str1
            })
            window.location = "#output";
        }
    }
    createBullet = () => {
        if (this.inpvalid()) {
            let str1 = this.state.inpTxt;
            let strArr = str1.split("\n");
            let olFlag = false;
            for (let i = 0; i < strArr.length; i++) {
                let trimTxt = strArr[i].trim();
                let charTxt = trimTxt.charAt(0).toString()
                if (charTxt.match(/[0-9]/i) && !olFlag)
                    olFlag = true;
                if (charTxt.match(/[a-zA-Z0-9]/i))
                    trimTxt = trimTxt.substring(trimTxt.indexOf(".") + 1,);
                else
                    trimTxt = trimTxt.substring(1,);
                trimTxt = trimTxt.trim()
                strArr[i] = `<li>${trimTxt}</li>`
            }
            if (olFlag) {
                strArr.unshift("<ol>");
                strArr.push("</ol>");
            }
            else {
                strArr.unshift("<ul>");
                strArr.push("</ul>");

            }
            str1 = strArr.join("\n");
            this.setState({
                outTxt: str1
            })
            window.location = "#output";
        }
    }
    addTags = () => {
        if (this.inpvalid()) {
            let str1 = this.state.inpTxt;
            let tag = this.state.rmtag;
            let strArr = str1.split("\n");
            for (let i = 0; i < strArr.length; i++) {
                let trimTxt = strArr[i].trim();
                if (tag === "img") {
                    trimTxt = `<img src="${trimTxt}" />`
                }
                else if (tag === "a") {
                    trimTxt = `<a href="${trimTxt}" ></a>`
                }
                else if (tag === "select") {
                    if (i === 0) trimTxt = `<select>\n<option value="${trimTxt}">${trimTxt}</option>`
                    else if (i === strArr.length - 1) trimTxt = `<option value="${trimTxt}">${trimTxt}</option>\n</select>`
                    else trimTxt = `<option value="${trimTxt}">${trimTxt}</option>`
                }
                else {
                    trimTxt = `<${tag}>${trimTxt}</${tag}>`;
                }
                strArr[i] = trimTxt;
            }
            str1 = strArr.join("\n");
            this.setState({
                outTxt: str1
            })
            window.location = "#output";
        }
    }
    removeTags = () => {
        if (this.inpvalid()) {
            let str1 = this.state.inpTxt;
            let tag = this.state.rmtag.toLowerCase();
            let re = new RegExp(`<${tag}[-a-zA-Z0-9@:%._\\+~#?&//= "']*>`, "gi");
            str1 = str1.replace(re, "");
            str1 = str1.replaceAll(`</${tag}>`, "");
            this.setState({
                outTxt: str1
            })
            window.location = "#output";
        }
    }
    replaceStr = () => {
        if (this.inpvalid()) {
            let inp = this.state.inpTxt;
            let fnd = this.state.findStr;
            let repl = this.state.replStr;
            inp = inp.replaceAll(fnd, repl);
            this.setState({
                outTxt: inp
            })
            window.location = "#output";
        }
    }
    textCopied = () => {
        navigator.clipboard.writeText(this.state.outTxt)
        this.setState({
            popShow: true
        })
        setTimeout(() => {
            this.setState({
                popShow: false
            })
        }, this.state.timer)
    }
    keyHandler = (...action) => {
        let enterKey = 13;
        if (action[0].keyCode === enterKey && action[1] === "rmtag") {
            this.removeTags();
        }
    }
    closeDialogbox = () => {
        this.setState({
            showDialogBox: false,
        })
    }
    // Might come handy next time --- adding text in text area on click
    // insertionPoint = () => {
    //     let text_to_add = this.state.insertPoint; // "insert-1"
    //     let textarea = document.getElementById("textIn");
    //     let start_position = textarea.selectionStart;
    //     let end_position = textarea.selectionEnd;

    //     textarea.value = `${textarea.value.substring(
    //         0,
    //         start_position
    //     )}${text_to_add}${textarea.value.substring(
    //         end_position,
    //         textarea.value.length
    //     )}`;
    //     text_to_add = text_to_add.slice(0, -1) + (Number(text_to_add.slice(-1)) + 1);
    //     this.setState({
    //         insertPoint: text_to_add
    //     })
    // }
    createStructureFromTxt = () => {
        if (this.inpvalid('dialog')) {
            let str1 = this.state.inpTxt;
            let strArr = str1.split("\n");
            let dialogStruct = this.state.inpDialog;
            let strArr1 = dialogStruct.split("\n");
            strArr1 = strArr1.map(item => item.toLowerCase());
            let len = strArr.length;
            let len2 = strArr1.length;
            for (let i = 0, j = 0; i < len; i++) {
                strArr[i] = `<${strArr1[j]}>${strArr[i]}</${strArr1[j]}>`
                if (i < len2 - 1) {
                    j++;
                }
            }
            str1 = strArr.join('\n');
            this.setState({
                outTxt: str1,
                showDialogBox: false
            })
            window.location = "#output";
        }
    }
    render() {
        return (
            <div className='container container-fluid'>
                <div className='row my-3 justify-content-space-between'>
                    <h2 className='col-md-9'>Clean your code + get a helping hand</h2>
                    <button className="col-md-3 btn btn-success" data-bs-toggle="collapse" data-bs-target="#opContent" onClick={() => this.setState({ arrowRotate: !this.state.arrowRotate })}>Operations <Icon.CaretRightFill className={this.state.arrowRotate ? "rotateRight" : "arrow"} /></button>
                </div>
                <div className='collapse navbar-collapse' id='opContent'>
                    {
                        this.state.inpErr ?
                            <div className="row alert alert-danger" role="alert">
                                Please provide an input to proceed
                            </div>
                            : ""
                    }
                    <div className='row mb-3 gap-2'>
                        <button className='col btn btn-success' onClick={this.removeNbspFunc}>Remove nbsp</button>
                        <button className='col btn btn-success' onClick={() => this.setState({ showDialogBox: true })}>Convert txt to structure</button>
                        <button className='col btn btn-success' onClick={this.createBullet}>Create Bullet point</button>
                    </div>
                    <div className="row mb-3 gap-2">
                        <input type="text" className='col-md-8' onKeyUp={(e) => this.keyHandler(e, "rmtag")} placeholder='Enter the html tag to be added/removed eg: sup' name="rmtag" value={this.state.rmtag} onChange={(e) => this.inpTxtHandler(e)} id="" />
                        <button className='col btn btn-success' onClick={this.addTags}>Add tags</button>
                        <button className='col btn btn-success' onClick={this.removeTags}>Remove tags</button>
                    </div>
                    <div className="row mb-3 gap-2">
                        <input type="text" className='col-md' placeholder='Find' name="findStr" value={this.state.findStr} onChange={(e) => this.inpTxtHandler(e)} id="" />
                        <input type="text" className='col-md' placeholder='Replace' name="replStr" value={this.state.replStr} onChange={(e) => this.inpTxtHandler(e)} id="" />
                        <button className='col-md btn btn-success' onClick={this.replaceStr}>Replace String</button>
                    </div>
                </div>
                {
                    this.state.showDialogBox ?
                        <div className="dialogBoxArea">
                            <Icon.XCircle className='dialogBoxCross' onClick={this.closeDialogbox} />
                            {
                                this.state.inpDialogErr ?
                                    <div className="row alert alert-danger mt-3" role="alert">
                                        Please provide an input before proceeding
                                    </div>
                                    : ""
                            }
                            <div className="row gap-3 mt-4">
                                <textarea name="inpDialog" id="textIn" cols="30" rows="10" placeholder="Enter the structure eg.:
                                h3 
                                p 
                                p" value={this.state.inpDialog} onChange={(e) => this.inpTxtHandler(e)} ></textarea>
                                <button className='col-md btn btn-success' onClick={this.createStructureFromTxt}>Done</button>
                            </div>
                        </div>
                        : null
                }

                <div className='row gap-3 io-area'>
                    <h5>Input <Icon.ChevronCompactDown /></h5>
                    <textarea name="inpTxt" id="" placeholder='Enter your input here and click above operation to perform' cols="30" rows="10" value={this.state.inpTxt} onChange={(e) => this.inpTxtHandler(e)}></textarea>
                    {
                        this.state.popShow ?
                            <div className="alert alert-success" role="alert">
                                Text copied
                            </div>
                            : ""
                    }
                    <h5 id='output'>Output <Icon.ChevronCompactDown /></h5>
                    <textarea onClick={this.textCopied} name="outTxt" id="" placeholder='Output will be displayed here' cols="30" rows="10" value={this.state.outTxt} readOnly></textarea>
                </div>
            </div >
        )
    }
}
