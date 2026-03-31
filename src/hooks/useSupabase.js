import { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function useSupabase() {
    let useCollection = (tableName, queryCondition = null) => {
        const [data, setData] = useState([]);
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);

        // Array Reference အသစ်တွေ ခဏခဏ ဖြစ်ပြီး infinite loop မပတ်အောင် useRef နဲ့ ထိန်း
        const queryRef = useRef(queryCondition).current;

        useEffect(() => {
            setLoading(true);

            // 1. ပထမဆုံး အကြိမ် ဒေတာ အကုန်လုံးကို အရင်ဆွဲထုတ်မယ် (Initial Fetch)
            const fetchInitialData = async () => {
                let query = supabase
                    .from(tableName)
                    .select("*")
                    .order("created_at", { ascending: false });

                if (queryRef) {
                    // queryRef က ['id', '=', 5]
                    const [column, operator, value] = queryRef;
                    if (operator === "=") {
                        query = query.eq(column, value);
                    }
                }

                const { data: initialData, error: fetchError } = await query;

                if (fetchError) {
                    setError(fetchError.message);
                    setLoading(false);
                } else {
                    setData(initialData);
                    setLoading(false);
                    setError("");
                }
            };

            fetchInitialData();

            // 2. realtime data listener
            const channel = supabase
                .channel(`realtime-${tableName}`)
                .on(
                    "postgres_changes",
                    { event: "*", schema: "public", table: tableName },
                    (payload) => {
                        // update the state
                        fetchInitialData();
                    },
                )
                .subscribe();

            // 3. cleanup Function
            return () => {
                supabase.removeChannel(channel);
            };
        }, [tableName, queryRef]);

        return { data, error, loading };
    };

    return { useCollection };
}
