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
            arrowRotate: false
        }
    }
    inpTxtHandler = (e) => {
        let name = e.target.name;
        this.setState({
            [name]: e.target.value,
            inpErr: false
        })
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
            console.log(str1);
            this.setState({
                outTxt: str1
            })
            window.location = "#output";
        }
    }
    createRefer = () => {
        if (this.inpvalid()) {
            let str1 = this.state.inpTxt;
            let strArr = str1.split("\n");
            strArr[0] = strArr[0].replace("<h3>", "<p><strong>");
            strArr[0] = strArr[0].replace("</h3>", "</strong></p>");
            for (let i = 1; i < strArr.length; i++) {
                let indUrl = strArr[i].indexOf("/");
                let indText = strArr[i].indexOf("[");
                let url = strArr[i].substring(indUrl, strArr[i].length - 1);
                let text = strArr[i].substring(0, indText);
                url = url.trim();
                text = text.trim();
                let newStr = `<p><u><a href="${url}">${text}</a></u></p>`
                strArr[i] = newStr;
            }
            if (strArr[0].substring(0, 3) !== "<p>") {
                strArr[0] = `<p><strong>${strArr[0]}</strong></p>`;
            }
            str1 = strArr.join("\n");
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
                trimTxt = `<${tag}>${trimTxt}</${tag}>`;
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
            let tag = this.state.rmtag;
            str1 = str1.replaceAll(`<${tag}>`, "");
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
        }, 2000)
    }
    keyHandler = (...action) => {
        if (action[0].keyCode === 13) {
            if (action[1] === "rmtag") this.removeTags();
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
                        <button className='col btn btn-success' onClick={this.createRefer}>Create Reference</button>
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
