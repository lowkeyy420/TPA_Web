import { useAxios } from "@/hooks/useAxios";
import React from "react";

function Test() {
  const url = process.env.BASE_URL + "test";

  const [loading, data, error, request] = useAxios({
    method: "GET",
    url: url,
  });

  return (
    <div>
      {loading && <h1>loading</h1>}
      {error && <h1>{error}</h1>}
      {!error && <h1>INI DATA CERITANYA</h1>}
    </div>
  );
}

export default Test;
