/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import { uploadingFile, deletingFile } from '../../services/api';
import '../styles/FileSharing.css'
import loaderGif from '../../assets/doggy.gif'
export default class FileSharing extends Component {
    constructor() {
        super();
        this.state = {
            fileURL: '',
            downloadPath: '',
            loaderShow: false
        }
    }
    componentDidMount = () => {
        this.clearAll();
    }
    componentDidUpdate = () => {
        let fileData = this.state.fileURL;
        if (fileData && !this.state.loaderShow) {
            this.getImage();
        }
    }
    clearAll = async () => {
        try {
            await deletingFile("clearAll")
        } catch (error) {
            console.log(error.message);
        }
    }
    getImage = async () => {
        try {
            this.setState({ loaderShow: true });
            let fileData = this.state.fileURL;
            let data = new FormData();
            data.append("name", fileData.name);
            data.append("file", fileData);
            let response = await uploadingFile(data);
            console.log(response);
            this.setState({
                downloadPath: response.path,
                fileURL: '',
                loaderShow: false
            }, () => {
                this.imageDelTimer();
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    imageDelTimer = () => {
        let id = this.state.downloadPath;
        id = id.substring(id.lastIndexOf('/') + 1,);
        console.log(id);
        setTimeout(async (id) => {
            await deletingFile(id);
            this.setState({
                downloadPath: '',
            })
        }, 600000, id)
    }
    uploadFile = () => {
        document.getElementById("fileUploadInp").click();
    }

    render() {
        return (
            <div className='fileshareBG'>
                <div id='fileShare'>
                    <h1>File Sharing</h1>
                    <p>Upload any file and share the download link</p>
                    <button onClick={this.uploadFile}>Upload</button>
                    <input onChange={(e) => this.setState({ fileURL: e.target.files[0] })} type="file" name="file" id="fileUploadInp" style={{ display: 'none' }} />

                    {
                        this.state.downloadPath !== '' ?
                            <div id='downloadResult'>
                                <a href={this.state.downloadPath}>{this.state.downloadPath}</a>
                                <p>Link will valid for only 10 min</p>
                            </div> : null
                    }
                    {
                        this.state.loaderShow ? <div><img src={loaderGif} alt="loading.." /></div> : null
                    }
                </div>

            </div>
        )
    }
}
