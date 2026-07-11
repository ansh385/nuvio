import express from "express";
import cors from "cors";
import { supabase } from "./config/supabase";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import { errorHandler } from "./middleware/error.middleware";
import journeyRoutes from "./routes/journey.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/journey", journeyRoutes);

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "healthy",
        service: "Nuvio API",
        version: "1.0.0",
    });
});

app.get("/api/database-health", async (_req, res) => {
    try {
        const { error } = await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        res.status(200).json({
            status: "connected",
            service: "Supabase",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to connect to Supabase",
        });
    }
});

app.use(errorHandler);

export default app;