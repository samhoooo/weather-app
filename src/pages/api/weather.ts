// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Response =
  | {
      temperature: number;
      precipitation: number;
      windSpeed: number;
    }
  | {
      error: string;
    };

type OpenMeteoResponse = {
  current: {
    temperature_2m: number;
    precipitation: number;
    wind_speed_10m: number;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { lat, long } = req.query;

  try {
    // Fetch weather from Open-Meteo
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,wind_speed_10m&timezone=Europe%2FLondon`
    );
    const body = (await response.json()) as OpenMeteoResponse;

    // Check if the API response is ok
    if (
      !response.ok ||
      body?.current?.temperature_2m == null ||
      body?.current?.precipitation == null ||
      body?.current?.wind_speed_10m == null
    ) {
      throw new Error(response.statusText);
    }

    // Return API response in a structured WeatherData object
    res.status(200).json({
      temperature: body.current.temperature_2m,
      precipitation: body.current.precipitation,
      windSpeed: body.current.wind_speed_10m,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch from open-meteo",
    });
  }
}
