import { createContext, useEffect, useReducer } from "react";
import { supabase } from "../../supabaseClient";

let AuthContext = createContext();

let AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOG_IN":
            return { ...state, user: action.payload };
        case "LOG_OUT":
            return { ...state, user: null };
        case "AUTH_READY":
            return { ...state, authReady: true };
        default:
            return state;
    }
};

function AuthContextsProvider({ children }) {
    let [state, dispatch] = useReducer(AuthReducer, {
        user: null,
        authReady: false,
    });

    useEffect(() => {
        const initAuth = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (session) {
                dispatch({ type: "LOG_IN", payload: session.user });
            }
            dispatch({ type: "AUTH_READY" });
        };

        initAuth();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                dispatch({ type: "LOG_IN", payload: session.user });
            } else {
                dispatch({ type: "LOG_OUT" });
            }

            console.log("Auth Event:", event);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    );
}

export { AuthContext, AuthContextsProvider };
