"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

type Appointment = {
  _id: string;
  user: {
    username: string;
    email: string;
  };
  date: string;
  time: string;
  status: string;
};

export default function DieticianDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // 🔥 FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments/dietician",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🔥 APPROVE / REJECT
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAppointments(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Dietician</h2>
        <ul>
          <li>Dashboard</li>
          <li>Appointments</li>
          <li>Patients</li>
          <li>Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="main">
        <h1>Dashboard</h1>

        {/* CARDS */}
        <div className="cards">
          <div className="card">Total: {appointments.length}</div>
          <div className="card">
            Pending: {appointments.filter(a => a.status === "pending").length}
          </div>
          <div className="card">
            Approved: {appointments.filter(a => a.status === "approved").length}
          </div>
        </div>

        {/* APPOINTMENTS */}
        <div className="table">
          <h2>Appointments</h2>

          {appointments.map((a) => (
            <div key={a._id} className="row">
              <div>
                <strong>{a.user?.username}</strong>
                <p>{a.user?.email}</p>
              </div>

              <div>{a.date}</div>
              <div>{a.time}</div>

              <div className={`status ${a.status}`}>
                {a.status}
              </div>

              <div className="actions">
                <button
                  onClick={() => updateStatus(a._id, "approved")}
                  className="approve"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(a._id, "rejected")}
                  className="reject"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}