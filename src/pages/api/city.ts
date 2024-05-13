// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "./data/cities.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { keyword } = req.query;

  if (!keyword) {
    return res.json([]);
  }

  const output = data.cities.filter((country) =>
    country.name
      .toLocaleLowerCase()
      .startsWith(keyword.toString().toLocaleLowerCase())
  );
  return res.json(output);
}
