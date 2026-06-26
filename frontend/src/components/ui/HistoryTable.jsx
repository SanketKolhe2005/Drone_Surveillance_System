const HistoryTable = () => {
  return (
    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        background: "white",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>Object</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Person</td>
          <td>10:30 AM</td>
          <td>Detected</td>
        </tr>

        <tr>
          <td>Mobile Phone</td>
          <td>11:15 AM</td>
          <td>Detected</td>
        </tr>
      </tbody>
    </table>
  );
};

export default HistoryTable;