import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import axios from "axios";

const chartConfig = {
  desktop: {
    label: "day",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const TimeSeriesChart = () => {
  const [minValue, setMinValue] = useState(9.7);
  const [maxValue, setMaxValue] = useState(9.9);
  const [currencyData, setCurrencyData] = useState<{ day: string; MAD: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMaxMinValues = (data: { day: string; MAD: number }[]) => {
    const values = data.map((day) => day.MAD);

    const min = Math.min(...values);
    const max = Math.max(...values);

    setMinValue(min - 0.05);
    setMaxValue(max + 0.05);
  };

  const getCurrencyData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:4000/history", { withCredentials: true });
      setCurrencyData(data);
      handleMaxMinValues(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrencyData();
  }, []);

  return (
    isLoading || (
      <Card>
        <CardContent className="p-4">
          <ChartContainer config={chartConfig}>
            <AreaChart accessibilityLayer data={currencyData} margin={{ left: 25, right: 25 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 6)}
                interval={7}
              />
              <YAxis domain={[minValue, maxValue]} hide={true} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
              <Area
                dataKey="MAD"
                type="linear"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  );
};

export default TimeSeriesChart;
