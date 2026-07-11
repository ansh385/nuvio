import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    if (error instanceof Error) {
        if (error.message === "Invalid login credentials") {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        if (error.message === "User already registered") {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
}