import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

const parser = new UAParser();

export async function getClicksforUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

export async function getClicksforUrl({ url_id }) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load stats");
  }

  return data;
}

export const storeClicks = async ({ id }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    // Optional: async fetch location
    const response = await fetch("https://ipapi.co/json").catch(() => ({}));
    const { city, country_name: country } = await response.json().catch(() => ({}));

    await supabase.from("clicks").insert({
      url_id: id,
      city: city || null,
      country: country || null,
      device,
    });
  } catch (err) {
    console.error("Error recording click:", err);
  }
};
