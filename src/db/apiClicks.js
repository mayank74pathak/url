import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

const parser = new UAParser();

// 📊 Get all clicks for multiple URLs
export async function getClicksforUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("❌ Error fetching clicks:", error);
    return null;
  }

  console.log("📊 Clicks fetched for URLs:", data);
  return data;
}

// 📊 Get clicks for a single URL
export async function getClicksforUrl({ url_id }) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error("❌ Error fetching clicks:", error);
    throw new Error("Unable to load stats");
  }

  console.log(`📊 Clicks fetched for URL ${url_id}:`, data);
  return data;
}

// 🖱️ Store click event
export const storeClicks = async ({ id }) => {
  try {
    // ✅ Parse device correctly
    const res = parser.getResult();
    const device = res.device?.type || "desktop";

    let city = null;
    let country = null;

    try {
      const response = await fetch("https://ipapi.co/json"); // ✅ use HTTPS
      if (response.ok) {
        const location = await response.json();
        city = location.city || null;
        country = location.country_name || null;
      }
    } catch (err) {
      console.warn("⚠️ Location fetch failed:", err);
    }

    // ✅ Insert into Supabase
    const { data, error } = await supabase.from("clicks").insert({
      url_id: id,
      city,
      country,
      device,
    });

    if (error) {
      console.error("❌ Error inserting click:", error);
    } else {
      console.log("✅ Click stored:", data);
    }
  } catch (err) {
    console.error("Error recording click:", err);
  }
};
