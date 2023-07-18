/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import { uploadingFile, deletingFile } from '../../services/api';
import '../styles/FileSharing.css'
export default class FileSharing extends Component {
    constructor() {
        super();
        this.state = {
            fileURL: '',
            downloadPath: ''
        }
    }
    componentDidUpdate = () => {
        this.getImage();
    }
    getImage = async () => {
        let fileData = this.state.fileURL;
        if (fileData) {
            let data = new FormData();
            data.append("name", fileData.name);
            data.append("file", fileData);
            let response = await uploadingFile(data);
            console.log(response);
            this.setState({
                downloadPath: response.path,
                fileURL: ''
            }, () => {
                this.imageDelTimer();
            })
        }
    }
    imageDelTimer = () => {
        let id = this.state.downloadPath;
        id = id.substring(id.lastIndexOf('/') + 1,);
        console.log(id);
        setTimeout(async (id) => {
            await deletingFile(id);
            this.setState({
                downloadPath: ''
            })
        }, 600000, id)
    }

    fileinputRef = React.createRef();
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

                </div>
            </div>
        )
    }
}
