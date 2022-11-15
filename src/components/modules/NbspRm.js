import React, { Component } from 'react'

export default class NbspRm extends Component {
    constructor() {
        super();
        this.state = {
            inpTxt: '',
            outTxt: ''
        }
    }
    inpTxtHandler = (e) => {
        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }
    removeNbspFunc = () => {
        let str1 = this.state.inpTxt;
        str1 = str1.replaceAll("&nbsp;", " ");
        str1 = str1.replaceAll("  ", " ");
        this.setState({
            outTxt: str1
        })

    }
    createRefer = () => {
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
            console.log("new str=", newStr);
            strArr[i] = newStr;
        }
        str1 = strArr.join("\n");
        this.setState({
            outTxt: str1
        })
    }
    render() {
        return (
            <div>
                <h1>Removing Nbsp and double space from text</h1>
                <textarea name="inpTxt" id="" placeholder='Enter your input here' cols="30" rows="10" value={this.state.inpTxt} onChange={(e) => this.inpTxtHandler(e)}></textarea>
                <button onClick={this.removeNbspFunc}>Remove nbsp</button>
                <button onClick={this.createRefer}>Create Reference</button>
                <textarea name="outTxt" id="" placeholder='Output will be displayed here' cols="30" rows="10" value={this.state.outTxt} readOnly></textarea>
            </div>
        )
    }
}
