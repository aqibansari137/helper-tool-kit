import React, { Component } from 'react'

export default class NbspRm extends Component {
    constructor() {
        super();
        this.state = {
            inpTxt: '',
            outTxt: '',
            popShow: false
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
            strArr[i] = newStr;
        }
        str1 = strArr.join("\n");
        this.setState({
            outTxt: str1
        })
    }
    createBullet = () => {
        let str1 = this.state.inpTxt;
        let strArr = str1.split("\n");
        for (let i = 0; i < strArr.length; i++) {
            let trimTxt = strArr[i].trim();
            let charTxt = trimTxt.charAt(0).toString()
            if (charTxt.match(/[a-zA-Z0-9]/i))
                trimTxt = trimTxt.substring(2,);
            else {
                trimTxt = trimTxt.substring(1,);
            }
            strArr[i] = `<li>${trimTxt}</li>`
        }
        str1 = strArr.join("\n");

        str1 = `<ul>
        ${str1}
        </ul>`
        this.setState({
            outTxt: str1
        })
    }
    alertPop = () => {
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
    render() {
        return (
            <div>
                <h2 className='my-2 row text-center'>Removing Nbsp and double space from text</h2>
                <div className='row mb-3 gap-2'>
                    <button className='col btn btn-success' onClick={this.removeNbspFunc}>Remove nbsp</button>
                    <button className='col btn btn-success' onClick={this.createRefer}>Create Reference</button>
                    <button className='col btn btn-success' onClick={this.createBullet}>Create Bullet point</button>
                </div>
                <div className='row gap-3'>
                    <textarea name="inpTxt" id="" placeholder='Enter your input here and click above operation to perform' cols="30" rows="10" value={this.state.inpTxt} onChange={(e) => this.inpTxtHandler(e)}></textarea>
                    {
                        this.state.popShow ?
                            <div class="alert alert-success" role="alert">
                                Text copied
                            </div>
                            : ""
                    }
                    <textarea onClick={this.alertPop} name="outTxt" id="" placeholder='Output will be displayed here' cols="30" rows="10" value={this.state.outTxt} readOnly></textarea>
                </div>
            </div >
        )
    }
}
