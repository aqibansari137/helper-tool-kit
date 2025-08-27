import { useEffect, useState } from "react";
import "../styles/DueTracker.scss";
import { useForm } from "react-hook-form";
import * as Icon from "react-bootstrap-icons";

export default function DueTracker() {
  const [trackerData, setTrackerData] = useState([]);
  const [totalLent, setTotalLent] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);
  const [showEntryPopup, setShowEntryPopup] = useState(false);
  const [currPaymentId, setCurrPaymentId] = useState("");
  const [showPaymentHistory, setShowPaymentHistory] = useState(-1);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dueTrackerData")) || [];
    setTrackerData(savedData);
  }, []);

  useEffect(() => {
    // Update Dashboard Data on User Data change
    const dueSum = trackerData.reduce((sum, item) => sum + item.total_due, 0);
    setTotalLent(dueSum);
    const receivedSum = trackerData.reduce(
      (sum, item) => sum + item.total_received,
      0
    );
    setTotalReceived(receivedSum);

    // Saved the updated data in localstorage
    localStorage.setItem("dueTrackerData", JSON.stringify(trackerData));
  }, [trackerData]);

  const onSubmit = (data) => {
    let newEntry = {
      id: crypto.randomUUID(),
      name: data.name,
      date_time: data.time,
      total_due: data.amount,
      total_received: 0,
      paymentsList: [],
    };
    setTrackerData((prevVal) => [...prevVal, newEntry]);
    setShowEntryPopup(false);
    reset();
  };

  const paymentSubmit = (data) => {
    setTrackerData((prev) =>
      prev.map((item) =>
        item.id === currPaymentId
          ? {
              ...item,
              total_received: item.total_received + data.payment,
              paymentsList: [
                ...item.paymentsList,
                { payment: data.payment, paytime: data.paytime },
              ],
            }
          : item
      )
    );
    setCurrPaymentId("");
    reset();
  };

  const deleteEntry = (id) => {
    setTrackerData((prevVal) => prevVal.filter((item) => item.id !== id));
  };

  const currStatus = (data) => {
    if (data.total_received === 0) {
      return <span className="outstand">Outstanding</span>;
    } else if (data.total_due === data.total_received) {
      return <span className="paid">Paid</span>;
    }
    return <span className="partial">Partial</span>;
  };

  const dataTimeFormat = (dateVal) => {
    let time = new Date(dateVal);
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    time = time.toLocaleString("en-GB", options);
    time = time.replace(",", " -");
    return <span>{time}</span>;
  };

  const fetchFieldByID = (id, fieldType) => {
    let fieldVal = trackerData.filter((item) => item.id === id)[0];
    return fieldVal?.[fieldType];
  };

  return (
    <div className="tracker-container">
      {/* New Entry Popup */}
      {showEntryPopup && (
        <div className="dialogBoxArea">
          <div className="form-head">
            <h3 className="m-0">Add New Entry</h3>
            <Icon.XCircle onClick={() => setShowEntryPopup(false)} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            <div>
              <label htmlFor="name">Borrower Name</label>
              <input
                name="name"
                id="name"
                placeholder="Enter Borrower Name"
                type="text"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="error-msg">This field is required</span>
              )}
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <div className="amt-inp">
                <span className="rupee">&#x20B9;</span>
                <input
                  name="amount"
                  id="amount"
                  placeholder="0.00"
                  type="number"
                  {...register("amount", {
                    required: "This field is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Amount cannot be zero" },
                  })}
                />
              </div>
              {errors.amount && (
                <span className="error-msg">{errors.amount.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <div className="date-cotent">
                <input
                  name="date"
                  id="date"
                  type="datetime-local"
                  {...register("time", { required: true })}
                />
                <Icon.Calendar />
              </div>
              {errors.time && (
                <span className="error-msg">This field is required</span>
              )}
            </div>
            <div className="flex-row mt-3">
              <input type="submit" className="btn-grad mt-0 me-4" />
              <button
                className="btn-grad btn-grad-red"
                onClick={() => setShowEntryPopup(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payment History Popup */}
      {currPaymentId !== "" && (
        <div className="dialogBoxArea">
          <div className="form-head">
            <h3 className="m-0">Add Payments</h3>
            <Icon.XCircle onClick={() => setCurrPaymentId("")} />
          </div>
          <form onSubmit={handleSubmit(paymentSubmit)} className="entry-form">
            <div>
              <h5>
                Payment for <b>{fetchFieldByID(currPaymentId, "name")}</b>
              </h5>
              <p className="mb-0">
                Outstanding:{" "}
                <span style={{ color: "#ef4343" }}>
                  &#x20B9;{" "}
                  {fetchFieldByID(currPaymentId, "total_due") -
                    fetchFieldByID(currPaymentId, "total_received")}
                </span>
              </p>
            </div>
            <div>
              <label htmlFor="payment">Amount</label>
              <div className="amt-inp">
                <span className="rupee">&#x20B9;</span>
                <input
                  name="payment"
                  id="payment"
                  placeholder="0.00"
                  type="number"
                  {...register("payment", {
                    required: "This field is required",
                    valueAsNumber: true,
                    max: {
                      value:
                        fetchFieldByID(currPaymentId, "total_due") -
                        fetchFieldByID(currPaymentId, "total_received"),
                      message:
                        "Amount cannot be greater than outstanding amount",
                    },
                    min: { value: 1, message: "Amount cannot be zero" },
                  })}
                />
              </div>
              {errors.payment && (
                <span className="error-msg">{errors.payment.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <div className="date-cotent">
                <input
                  name="date"
                  id="date"
                  type="datetime-local"
                  {...register("paytime", { required: true })}
                />
                <Icon.Calendar />
              </div>
              {errors.paytime && (
                <span className="error-msg">This field is required</span>
              )}
            </div>
            <div className="flex-row mt-3">
              <input type="submit" className="btn-grad mt-0 me-4" />
              <button
                className="btn-grad btn-grad-red"
                onClick={() => setCurrPaymentId("")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tracker Dashboard */}
      <div className="tracker-header">
        <div className="head-item">
          <p>Total Lent</p>
          <h2>&#x20B9; {totalLent}</h2>
          <p>Across {trackerData.length} people</p>
        </div>
        <div className="head-item received-tab">
          <p>Total Received</p>
          <h2>&#x20B9; {totalReceived}</h2>
          <p>From payment</p>
        </div>
        <div className="head-item outstanding-tab">
          <p>Total Outstanding</p>
          <h2>&#x20B9; {totalLent - totalReceived}</h2>
          <p>Still owed</p>
        </div>
      </div>

      <div className="entry-tab">
        <h2>Due Entry</h2>
        <button className="btn-grad" onClick={() => setShowEntryPopup(true)}>
          Add Entry
        </button>
      </div>

      {/* Tracker Table */}
      <div className="tracker-table">
        <table>
          <thead>
            <tr key="">
              <th>Borrower</th>
              <th>Date</th>
              <th>Lent</th>
              <th>Received</th>
              <th>Outstanding</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trackerData.map((item, index) => {
              return (
                <>
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{dataTimeFormat(item.date_time)}</td>
                    <td>&#x20B9; {item.total_due}</td>
                    <td className="received-amt">
                      &#x20B9; {item.total_received}
                    </td>
                    <td className="outstanding-amt">
                      &#x20B9; {item.total_due - item.total_received}
                    </td>
                    <td className="due-status">{currStatus(item)}</td>
                    <td>
                      <div className="action-icons">
                        <Icon.ChevronDown
                          style={{
                            transform:
                              showPaymentHistory === index
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                          onClick={() =>
                            setShowPaymentHistory((prevVal) =>
                              prevVal === index ? -1 : index
                            )
                          }
                        />
                        <Icon.PlusCircle
                          className={
                            item.total_due === item.total_received
                              ? "diabled-button"
                              : ""
                          }
                          onClick={() => setCurrPaymentId(item.id)}
                        />
                        <Icon.TrashFill onClick={() => deleteEntry(item.id)} />
                      </div>
                    </td>
                  </tr>
                  {showPaymentHistory === index && (
                    <>
                      <tr key="" className="payment-list">
                        <td colSpan={7} className="head">
                          {item.paymentsList.length === 0
                            ? "No payments recorded yet."
                            : "Payment History"}
                        </td>
                      </tr>
                      {item.paymentsList.map((subItem, subIndex) => {
                        return (
                          <tr key="subIndex" className="payment-list">
                            <td colSpan={6}>
                              {dataTimeFormat(subItem.paytime)}
                            </td>
                            <td colSpan={1} className="amt">
                              &#x20B9; {subItem.payment}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </>
              );
            })}
            {trackerData.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center">
                  <h4>--- No Entry yet ---</h4>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
