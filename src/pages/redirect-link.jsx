import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      try {
        // 1️⃣ Fetch original URL
        const data = await getLongUrl(id);

        if (!data?.original_url) {
          console.error("Original URL not found");
          return;
        }

        // 2️⃣ Store click
        await storeClicks({
          id: data.id,
          originalUrl: data.original_url,
        });

        // 3️⃣ Redirect to original URL
        window.location.href = data.original_url;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    redirect();
  }, [id]);

  if (loading) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;
