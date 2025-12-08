import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const useApi = async (url, options = {}, callBack, notProtected = false) => {
  let response = null;
  let error = null;

  try {
    const isFormData = options.data instanceof FormData;

    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

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
      withCredentials: true,
    });

    response = res.data;
    callBack(response, true);
  } catch (err) {
    console.error("Axios error:", err);
    error = err.response ? err.response.data : err;

    // ===================================================
    // 🚨 Redirect on 401 BUT skip if path = /auth/login
    // ===================================================
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname; // <-- only path
      const isOnLoginPage = currentPath === "/auth/login";

      if (err?.response?.status === 401 && !isOnLoginPage) {
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login"; // relative redirect
      }
    }
    // ===================================================

    callBack(error, false);
  }

  return { response, error };
};

export default useApi;
