import React from "react";
import "../styles/DueTracker.scss";

export default function DueTracker() {
  return (
    <div>
      <div className="tracker-header">
        <h2 className="my-3">Due Tracker</h2>
        <button className="btn-grad">New Entry</button>
      </div>
      <div className="tracker-card-list">
        <div className="tracker-card">
          <div className="head">
            <p className="title">Aqib</p>
            <p className="time">
              <span>17/8/2025</span>
              <span>8:45pm</span>
            </p>
          </div>
          <div className="tracker-card-body">
            <table aria-hidden="true">
              <tr>
                <td>Lended</td>
                <td></td>
                <td className="amount">&#8377; 2000</td>
              </tr>
              <tr className="last-row">
                <td>Remaining</td>
                <td></td>
                <td className="amount">&#8377; 2000</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
