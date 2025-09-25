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

export const storeClicks = ({ id, originalUrl }) => {
  try {
    // 1️⃣ Redirect immediately
    window.location.href = originalUrl;

    // 2️⃣ Log click asynchronously (does not block redirect)
    (async () => {
      const res = parser.getResult();
      const device = res.type || "desktop";

      try {
        const response = await fetch("https://ipapi.co/json");
        const { city, country_name: country } = await response.json();
        await supabase.from("clicks").insert({
          url_id: id,
          city: city,
          country: country,
          device: device,
        });
      } catch (err) {
        console.error("Error recording click:", err);
      }
    })();

  } catch (error) {
    console.error("Redirect failed:", error);
  }
};
