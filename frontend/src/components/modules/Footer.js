/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="py-3 mt-3">
        <div className="container">
          <p className="float-end mb-1">
            <a
              className="btn-grad to-top pt-0"
              onClick={() =>
                document.getElementById("root").scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              Back to top
            </a>
          </p>
          <p className="mb-1">Made by Aqib</p>
        </div>
      </footer>
    );
  }
}
