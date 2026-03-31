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

    let getDocument = (tableName, id) => {
        const [data, setData] = useState(null);
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            // id မပါလာရင် ဘာမှလုပ်စရာမလိုလို့ ခဏရပ်မယ်
            if (!id) return;

            setLoading(true);

            // (Initial Fetch)
            const fetchDocument = async () => {
                const { data: docData, error: fetchError } = await supabase
                    .from(tableName)
                    .select("*")
                    .eq("id", id) // id ကွက်တိတူတာကို ရှာတာ
                    .single(); // array မဟုတ်ဘဲ object တစ်ခုတည်းပဲ လိုချင်လို့

                if (fetchError) {
                    setError("No document found");
                    setData(null);
                    setLoading(false);
                } else {
                    setData(docData);
                    setError("");
                    setLoading(false);
                }
            };

            fetchDocument();

            // RealTime Event Listener
            const channel = supabase
                .channel(`realtime-${tableName}-${id}`)
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: tableName,
                        filter: `id=eq.${id}`, // ဒီ id တစ်ခုတည်း ပြောင်းလဲမှုကိုပဲ နားထောင်မယ်
                    },
                    (payload) => {
                        // ဒေတာအသစ် ပြောင်းလဲသွားရင် state ကို update လုပ်မယ်
                        if (payload.eventType === "DELETE") {
                            setData(null);
                            setError("This document was deleted");
                        } else {
                            setData(payload.new);
                        }
                    },
                )
                .subscribe();

            // 3. cleanup function
            return () => {
                supabase.removeChannel(channel);
            };
        }, [tableName, id]);

        return { data, error, loading };
    };

    return { useCollection, getDocument };
}
