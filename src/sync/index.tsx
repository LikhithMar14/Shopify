"use client";

import { useCartStore } from "@/store/cart.store";
import { useEffect } from "react";
import { useSession } from "next-auth/react"; 

const SyncCartOnLogin = () => {
    const { data: session, status } = useSession(); 
    const { syncCartWithDB } = useCartStore();

    useEffect(() => {
        if (status === "authenticated" && session?.user?.id) {
            const hasSynced = sessionStorage.getItem("cartSynced");
            if (!hasSynced) {
                console.log("RUNNING SYNC FOR USER:", session.user.id);
                syncCartWithDB(session?.user.id);
                sessionStorage.setItem("cartSynced", "true"); 
            }
        }
    }, [session?.user?.id, status, syncCartWithDB]);

    return null;
};

export default SyncCartOnLogin;
