// const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// const useApi = async (url, options = {}, callBack, notProtected) => {
//   let response = null;
//   let error = null;
//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log("user api (fetch)");

//   try {
//     const res = await fetch(baseUrl + url, {
//       method: options.method || "GET",
//       headers: {
//         "Content-Type": "application/json",
//         ...(options.headers || {}),
//       },
//       body: options.data ? JSON.stringify(options.data) : undefined,
//       credentials: "include", // ✅ needed for cookies
//     });

//     const data = await res.json();
//     response = data;

//     if (res.ok) {
//       callBack(response, true);
//     } else {
//       callBack(response, false);
//     }
//   } catch (err) {
//     console.error("Fetch error:", err);
//     error = err;
//     callBack(null, false);
//   }

//   return { response, error };
// };

// export default useApi;
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const useApi = async (url, options = {}, callBack, notProtected) => {
  let response = null;
  let error = null;

  try {
    // Detect if we’re sending FormData
    const isFormData = options.data instanceof FormData;

    const res = await axios({
      url: baseUrl + url,
      method: options.method || "GET",
      data: options.data || undefined,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
      },
      withCredentials: true, // ✅ include cookies (for auth)
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
