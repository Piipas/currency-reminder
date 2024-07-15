import env from "@repo/envalid/src/reminder";
import redis from "@repo/redis";
import axios from "axios";
import { formatToday, minusDays } from "./lib/utils";
import { transporter } from "config/nodemailer-client";
import cron from "node-cron";

const getTimeseries = async () => {
  try {
    const today = formatToday();
    const lastMonth = minusDays(30);
    const request_url = `https://api.currencybeacon.com/v1/timeseries?api_key=${env.EXCHANGE_RATES_API_KEY}&base=USD&start_date=${lastMonth}&end_date=${today}&symbols=MAD`;

    const {
      data: { response },
    } = await axios.get(request_url);

    const timeseries = Object.keys(response).map((day: string) => ({
      day: new Date(day).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      MAD: response[day]["MAD"],
    }));
    const latestvalue = timeseries.at(-1)?.MAD;
    const previousValue = await redis.get("currencyreminder:timeseries");

    await redis.set("currencyreminder:timeseries", JSON.stringify(timeseries));
    await redis.set("currencyreminder:latestvalue", latestvalue);

    console.log("USD > MAD timeseries stored successfully!");

    if (Number(previousValue) < 10 && timeseries.at(-1)?.MAD > 10) {
      console.log(previousValue);
      await transporter.sendMail({
        from: '"Pipas 👻" <boombeach449@gmail.com>', // sender address
        to: "ismailpipas@gmail.com", // list of receivers
        subject: "USD/MAD updated.", // Subject
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    }
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  } finally {
    redis.disconnect();
  }
};

// cron.schedule("0 1 * * *", getTimeseries);

getTimeseries();
