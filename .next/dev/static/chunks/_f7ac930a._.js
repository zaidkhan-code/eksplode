(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/useApi.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/axios@1.13.2/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const baseUrl = ("TURBOPACK compile-time value", "http://localhost:5000/api/");
const useApi = async (url, options = {}, callBack, notProtected = false)=>{
    let response = null;
    let error = null;
    try {
        const isFormData = options.data instanceof FormData;
        const accessToken = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("accessToken") : "TURBOPACK unreachable";
        const headers = {
            ...isFormData ? {} : {
                "Content-Type": "application/json"
            },
            ...options.headers || {},
            ...accessToken ? {
                Authorization: `Bearer ${accessToken}`
            } : {}
        };
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$axios$40$1$2e$13$2e$2$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
            url: baseUrl + url,
            method: options.method || "GET",
            data: options.data || undefined,
            headers,
            withCredentials: true
        });
        response = res.data;
        callBack(response, true);
    } catch (err) {
        console.error("Axios error:", err);
        error = err.response ? err.response.data : err;
        // ===================================================
        // 🚨 Redirect on 401 BUT skip if path = /auth/login
        // ===================================================
        if ("TURBOPACK compile-time truthy", 1) {
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
    return {
        response,
        error
    };
};
const __TURBOPACK__default__export__ = useApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/navigation.js [app-client] (ecmascript)");
// import { toast } from "react-toastify";
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/useApi.js [app-client] (ecmascript)"); // make sure your custom hook path is correct
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@1.7.4_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    _s();
    var _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(("TURBOPACK compile-time truthy", 1) ? JSON.parse(localStorage.getItem("user") || "null") : "TURBOPACK unreachable");
    const getStoredAuthData = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const userData = localStorage.getItem("user");
            return {
                accessToken: accessToken || null,
                refreshToken: refreshToken || null,
                user: userData ? JSON.parse(userData) : null
            };
        } catch (error) {
            console.error("Error reading auth data from localStorage:", error);
            return {
                accessToken: null,
                refreshToken: null,
                user: null
            };
        }
    };
    const protectAuthPages = ()=>{
        if (user) {
            router.push("/"); // redirect to homepage or dashboard
        }
    };
    // ✅ LOGIN
    const login = (email, password, rememberMe)=>{
        _s1();
        setIsLoading(true);
        const payload = {
            email,
            password,
            rememberMe
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("auth/login", {
            method: "POST",
            data: payload
        }, {
            "AuthProvider.login.useApi": (res, status)=>{
                setIsLoading(false);
                if (status) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(res?.message || "Login successful!");
                    console.log(res, "check user response please");
                    localStorage.setItem("accessToken", res?.accessToken);
                    localStorage.setItem("refreshToken", res?.refreshToken);
                    if (res?.user) {
                        localStorage.setItem("user", JSON.stringify(res.user));
                        setUser(res.user);
                    }
                    if (res?.user?.role == "merchant" && !res?.user?.webhookSecret) {
                        router.push("/merchant/webhook-setup");
                    } else {
                        router.push(`/${res?.user?.role}/dashboard`);
                    }
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(res?.error || "Invalid email or password!");
                }
            }
        }["AuthProvider.login.useApi"]);
    };
    _s1(login, "YdXwqDVp/2jyPTcf46wQe16nqmk=", false, function() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
        ];
    });
    // ✅ REGISTER
    const register = ({ fullName, email, password, confirmPassword, role })=>{
        _s2();
        if (password !== confirmPassword) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Passwords do not match");
            return;
        }
        if (!role) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning("Please select a role");
            return;
        }
        setIsLoading(true);
        const payload = {
            name: fullName,
            email,
            password,
            role
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("auth/register", {
            method: "POST",
            data: payload
        }, {
            "AuthProvider.register.useApi": (res, status)=>{
                setIsLoading(false);
                if (status) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(res?.message || "Account created successfully!");
                    router.push("/auth/login");
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(res?.message || "Registration failed!");
                }
            }
        }["AuthProvider.register.useApi"]);
    };
    _s2(register, "YdXwqDVp/2jyPTcf46wQe16nqmk=", false, function() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
        ];
    });
    // ✅ LOGOUT
    function Logout() {
        _s3();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("auth/logout", {
            method: "POST"
        }, {
            "AuthProvider.Logout.useApi": (res, status)=>{
                // router?.push("/auth/login");
                window.location.href = "/auth/login";
                console.log("api is calling proper");
                localStorage.clear();
            }
        }["AuthProvider.Logout.useApi"]);
    }
    _s3(Logout, "YdXwqDVp/2jyPTcf46wQe16nqmk=", false, function() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$useApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
        ];
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            isLoading,
            user,
            login,
            register,
            Logout,
            getStoredAuthData,
            protectAuthPages,
            setUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/Context/AuthContext.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "VRo7sYakU1u2o2OhqnpdVQ/2Tbs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_f7ac930a._.js.map