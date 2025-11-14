const express = require("express");
const e_queue = require('./queue');

const app = express();

app.use(express.json());

app.post("/event", (req, res) => {
  const { site_id, event_type, path, user_id, timestamp } = req.body;

  if (!site_id || !event_type) {
    return res.status(400).json({
      message: "site_id or event_type not found",
    });
  }

  const event = {
    site_id,
    event_type,
    path: path || null,
    user_id: user_id || null,
    timestamp: timestamp ? new Date(timestamp) : new Date(),
  };

  e_queue.push(event); //pushing event into queue

  return res.status(200).json({
    message: "Event recieved.",
  });
});

const PORT = 2025;

app.listen(PORT, () => console.log(`Ingestion is done on port ${PORT}`));
