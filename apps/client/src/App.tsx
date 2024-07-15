import TimeSeriesChart from "./components/timeseries-chart";

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="container w-[700px] p-4">
        <TimeSeriesChart />
      </div>
    </div>
  );
}

export default App;
