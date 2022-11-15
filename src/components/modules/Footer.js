/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className="text-muted py-3 mt-3 bg-light">
                <div className="container">
                    <p className="float-end mb-1">
                        <a href="#">Back to top</a>
                    </p>
                    <p className="mb-1">Made by Aqib</p>
                </div>
            </footer>
        )
    }
}
