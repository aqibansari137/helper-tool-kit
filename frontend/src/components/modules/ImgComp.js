import React from "react";
import upload from "../../assets/upload.webp";
import imageCompression from "browser-image-compression";

class ImgComp extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink: upload,
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false,
    };
  }

  handle = (e) => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true,
    });
  };

  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  click = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Bring a bigger image");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then((x) => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink,
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      <div className="m-5">
        <div className="text-center">
          <h1>React Image Compressor</h1>
        </div>

        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-center">
            {this.state.uploadImage ? (
              <img width="300px" src={this.state.originalLink} alt="inp" />
            ) : (
              <img width="300px" src={upload} alt="dummy" />
            )}
            <div className="d-flex justify-content-center">
              <button
                className="btn-grad mt-2"
                onClick={() => {
                  document.getElementById("uploadInp").click();
                }}
              >
                Upload
              </button>
              <input
                id="uploadInp"
                type="file"
                accept="image/*"
                onChange={(e) => this.handle(e)}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline text-center">
            <br />
            {this.state.outputFileName ? (
              <button
                type="button"
                className="btn-grad mt-2"
                onClick={(e) => this.click(e)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3 text-center">
            <img
              width="300px"
              src={this.state.compressedLink}
              alt="compressed"
            />
            {this.state.clicked ? (
              <div className="d-flex justify-content-center">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="mt-2 btn-grad w-75"
                  style={{ color: "white" }}
                >
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ImgComp;
