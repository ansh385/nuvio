import type { Request, Response } from "express";
import { signUpUser, loginUser } from "../services/auth.service";

export async function signUp(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const data = await signUpUser({
            email,
            password,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data,
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Registration failed";

        return res.status(400).json({
            success: false,
            message,
        });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const data = await loginUser({
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data,
        });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Login failed";

        return res.status(401).json({
            success: false,
            message,
        });
    }
}

export async function getCurrentUser(req: Request, res: Response) {
    return res.status(200).json({
        success: true,
        message: "Authenticated user retrieved successfully",
        user: res.locals.user,
    });
}