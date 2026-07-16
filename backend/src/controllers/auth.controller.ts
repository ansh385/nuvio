import type { NextFunction, Request, Response } from "express";
import {
    forgotPassword,
    loginUser,
    signUpUser,
} from "../services/auth.service";
import { authSchema } from "../validators/auth.validator";
import { getUserProfile } from "../services/profile.service";

export async function signUp(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = authSchema.parse(req.body);

        const data = await signUpUser({ email, password });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
}

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = authSchema.parse(req.body);

        const data = await loginUser({ email, password });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data,
        });
    } catch (error) {
        next(error);
    }
}

export async function forgotPasswordController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email } = req.body;

        await forgotPassword(email);

        return res.status(200).json({
            success: true,
            message: "Password reset email sent successfully",
        });
    } catch (error) {
        next(error);
    }
}

export async function getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const user = res.locals.user;

        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const accessToken = authorizationHeader.replace("Bearer ", "");

        const profile = await getUserProfile(
            user.id,
            accessToken
        );

        return res.status(200).json({
            success: true,
            message: "Authenticated user retrieved successfully",
            user,
            profile,
        });
    } catch (error) {
        next(error);
    }
}