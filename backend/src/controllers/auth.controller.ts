import type { NextFunction, Request, Response } from "express";
import { loginUser, signUpUser } from "../services/auth.service";
import { authSchema } from "../validators/auth.validator";

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

export async function getCurrentUser(
    _req: Request,
    res: Response
) {
    return res.status(200).json({
        success: true,
        message: "Authenticated user retrieved successfully",
        user: res.locals.user,
    });
}