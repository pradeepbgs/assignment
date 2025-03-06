const express = require("express");
const cors = require("cors");
require('dotenv').config();


const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

const log = (level, message, meta = {}) => {
    console.log('\n'+JSON.stringify({
        level,
        message,
        timestamp: new Date().toISOString(),
        ...meta
    }, null, 2)+'\n');
};

app.use((req, _, next) => {
    log('info', 'Incoming request', { method: req.method, url: req.url});
    next();
});

app.get("/api/greet", (req, res) => {
    try {
        const name = req.query.name;
        if (!name) {
            return res.status(400).json({ error: "Name is required." });
        }
        res.json({ message: `Hello, ${name}! Welcome to Younglabs.` });
    } catch (error) {
        console.error("Error in /api/greet:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3000;
const server =app.listen(PORT, () => log("info", `Server started on port ${PORT}`));

function shutDown(){
    server.close();
    log('info', 'Server closed');
    process.exit(0);
}
process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);