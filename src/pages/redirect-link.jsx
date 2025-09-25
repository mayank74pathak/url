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
        // ✅ Fetch data here, not outside
        const data = await getLongUrl(id);

        // 🔍 Debug logs
        console.log("Param ID:", id);
        console.log("Data from Supabase:", data);

        if (!data?.original_url) {
          console.error("Original URL not found");
          return;
        }

        // Redirect immediately
        window.location.href = data.original_url;

        // Log click in background (doesn’t block redirect)
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
