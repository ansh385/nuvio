import type { NextFunction, Request, Response } from "express";
import { supabase } from "../config/supabase";

export async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const token = authHeader.split(" ")[1];

        const {
            data: { user },
            error,
        } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        res.locals.user = user;

        next();
    } catch {
        return res.status(500).json({
            success: false,
            message: "Authentication verification failed",
        });
    }
}