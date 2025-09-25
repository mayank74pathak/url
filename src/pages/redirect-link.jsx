import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        // 1️⃣ Fetch original URL from backend
        const data = await getLongUrl(id);

        if (!data?.original_url) {
          console.error("Original URL not found");
          return;
        }

        // 2️⃣ Store click in DB
        await storeClicks({ id: data.id, originalUrl: data.original_url });

        // 3️⃣ Redirect browser
        window.location.href = data.original_url;
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
