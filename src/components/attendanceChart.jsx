import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const AttendanceChart = ({ data }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-lg font-bold mb-3">Attendance Overview</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="present" stroke="#2563EB" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default AttendanceChart;
