"use client";

import { useCartStore } from "@/store/cart.store";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const SyncCartOnLogin = () => {
    const { data: session, status } = useSession();
    const { syncCartWithDB } = useCartStore();
    
    console.log("Outside Effect");

    useEffect(() => {
        console.log("Inside Effect");
        
        if (status === "authenticated" && session?.user?.id) {
            console.log("Triggered Wrapper 🚀");

            const hasSynced = sessionStorage.getItem("cartSynced");
            if (!hasSynced) {
                console.log("RUNNING SYNC FOR USER:", session.user.id);
                syncCartWithDB(session.user.id);
                sessionStorage.setItem("cartSynced", "true");
            }
            console.log("HIT SYNC HIT SYNC");
        }
    }, [status, session, syncCartWithDB]); 

    return null;
};

export default SyncCartOnLogin;
