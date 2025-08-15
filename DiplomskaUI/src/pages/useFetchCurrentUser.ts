import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider.tsx";
import { User } from "../api";

const useFetchCurrentUser = () => {
    const { token, user, setUser } = useAuth();

    useEffect(() => {
        if (!token || user) return; // exit if no token or user already fetched

        const fetchUser = async () => {
            try {
                const response = await User.usersMeGet({
                    headers: { Authorization: `Bearer ${token}` },
                });

                const currentUser = response.data;
                setUser(currentUser); // store in context
            } catch (err) {
                console.error("Failed to fetch current user", err);
            }
        };

        fetchUser();
    }, [token, user, setUser]); // only fetch if token exists and user not yet fetched
};

export default useFetchCurrentUser;
