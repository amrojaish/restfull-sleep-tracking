import React, { useEffect, useState } from "react";
import { getUserSleepData } from "../pages/sleepData";
import { auth } from "../firebase-config";
import { FaBed, FaMoon, FaBell, FaExclamationTriangle, FaChartLine, FaClock } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SleepClock = () => {
  const [notification, setNotification] = useState("");
  const [sleepData, setSleepData] = useState([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const checkSleepDuration = async () => {
      if (!userId) return;

      const data = await getUserSleepData(userId);
      setSleepData(data.weeklyData);

      const recentSleepData = data.weeklyData.slice(0, 3);
      const sleptLessThanSixHours = recentSleepData.every(
        (entry) => entry.sleepDuration < 6
      );

      if (sleptLessThanSixHours) {
        setNotification(
          "Warning: You've been sleeping less than 6 hours recently. This can affect your health and well-being."
        );
      }
    };

    checkSleepDuration();
  }, [userId]);

  return (
    <div className="sleep-container">
      <div className="header">
        <FaMoon className="moon-icon" />
        <h1 className="title">Sleep Tracker</h1>
      </div>

      {notification && (
        <div className="notification">
          <FaExclamationTriangle className="warning-icon" />
          <div>
            <p className="notification-text">{notification}</p>
            <a
              href="https://www.nhs.uk/live-well/sleep-and-tiredness/"
              target="_blank"
              rel="noopener noreferrer"
              className="notification-link"
            >
              Learn about healthy sleep habits on NHS website →
            </a>
          </div>
        </div>
      )}

      <div className="chart-container">
        <div className="chart-header">
          <FaChartLine className="chart-icon" />
          <h2 className="chart-title">Sleep Pattern Analysis</h2>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sleepDuration"
                stroke="#8b5cf6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Hours of Sleep"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-card purple">
          <FaBed className="stats-icon" />
          <div>
            <h3 className="stats-title">Average Sleep</h3>
            <p className="stats-value">
              {sleepData.length > 0
                ? (
                    sleepData.reduce((acc, curr) => acc + curr.sleepDuration, 0) /
                    sleepData.length
                  ).toFixed(1)
                : 0}{" "}
              hrs
            </p>
          </div>
        </div>

        <div className="stats-card blue">
          <FaClock className="stats-icon" />
          <div>
            <h3 className="stats-title">Latest Sleep Duration</h3>
            <p className="stats-value">
              {sleepData[0]?.sleepDuration || 0} hrs
            </p>
          </div>
        </div>

        <div className="stats-card green">
          <FaBell className="stats-icon" />
          <div>
            <h3 className="stats-title">Sleep Status</h3>
            <p className="stats-value">
              {notification ? "Needs Improvement" : "Healthy Pattern"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepClock;