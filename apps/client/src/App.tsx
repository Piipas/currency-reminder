import SubscribeForm from "./components/subscribe-form";
import TimeSeriesChart from "./components/timeseries-chart";

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="container w-[700px] p-4 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">USD to MAD timeseries</h1>
          <p className="text-zinc-400 text-sm">
            Subscribe to get notified each time One USD reaches 10 Moroccan Dirhams.
          </p>
        </div>
        <TimeSeriesChart />
        <SubscribeForm />
      </div>
    </div>
  );
}

export default App;
