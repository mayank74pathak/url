import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();
const data = await getLongUrl(id);
const data = await getLongUrl(id);
console.log("Param ID:", id);
console.log("Data from Supabase:", data);
  useEffect(() => {
    const redirect = async () => {
      try {
        const data = await getLongUrl(id);

        if (!data?.original_url) {
          console.error("Original URL not found");
          return;
        }

        // 1️⃣ Redirect immediately
        window.location.href = data.original_url;

        // 2️⃣ Log click in background (async, does not block redirect)
        storeClicks({ id: data.id }).catch(err => console.error(err));

      } catch (err) {
        console.error("Redirect failed:", err);
      }
    };

    redirect();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <BarLoader width={"100%"} color="#36d7b7" />
      <p className="mt-4 text-center">Redirecting...</p>
    </div>
  );
};

export default RedirectLink;
