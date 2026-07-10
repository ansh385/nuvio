import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "healthy",
        service: "Nuvio API",
        version: "1.0.0",
    });
});

export default app;