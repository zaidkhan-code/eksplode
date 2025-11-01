import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const useApi = async (url, options = {}, callBack, notProtected = false) => {
  let response = null;
  let error = null;

  try {
    // Detect if data is FormData
    const isFormData = options.data instanceof FormData;

    // ✅ Get access token
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    // ✅ Build headers dynamically
    const headers = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    const res = await axios({
      url: baseUrl + url,
      method: options.method || "GET",
      data: options.data || undefined,
      headers,
      withCredentials: true, // ✅ includes cookies if needed
    });

    response = res.data;
    callBack(response, true);
  } catch (err) {
    console.error("Axios error:", err);
    error = err.response ? err.response.data : err;
    callBack(error, false);
  }

  return { response, error };
};

export default useApi;
