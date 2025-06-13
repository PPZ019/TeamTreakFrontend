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
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/refresh`, {
                    withCredentials: true
                });

                if (res.status === 200 && res.data.success) {
                    dispatch(setAuth(res.data.user));
                }
            } catch (err) {
                console.log("AutoLogin error:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []); // ✅ don't forget empty dependency array

    return loading;
};
