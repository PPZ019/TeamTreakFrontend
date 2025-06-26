import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/auth-slice";

export const useAutoLogin = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/api/auth/refresh`,
                    { withCredentials: true }
                );

                if (res.status === 200 && res.data.success) {
                    dispatch(setAuth(res.data.user));
                } else {
                    dispatch(setAuth(null)); // fallback if unexpected structure
                }
            } catch (err) {
                console.warn("🔒 AutoLogin failed:", err.response?.data?.message || err.message);
                dispatch(setAuth(null)); // logout fallback
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return loading;
};
