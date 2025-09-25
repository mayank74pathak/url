import CreateLink from "@/components/create-link";
import Error from "@/components/error";
import Linkcard from "@/components/linkcard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import { getClicksforUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();

  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(getClicksforUrls, urls?.map((url) => url.id) || []);

  useEffect(() => {
    if (user?.id) fnUrls();
  }, [user?.id]);

  useEffect(() => {
    if (urls?.length > 0) fnClicks();
  }, [urls]);

  const filteredUrls = (urls || []).filter((url) =>
    url?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls ? urls.length : 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            {/* ✅ guarded with null check */}
            <p>{clicks ? clicks.length : 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Header + Create Link */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>

      {/* Search */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>

      {error && <Error message={error?.message} />}

      {(filteredUrls || []).map((url, i) => (
        <Linkcard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>
  );
};

export default Dashboard;
