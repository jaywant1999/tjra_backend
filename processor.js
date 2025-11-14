const e_queue = require("./queue");
const database = require("./database");

console.log("Proceesor is working.....");

const BATCH_SIZE = 50;
const INTERVAL_MS = 1000;

async function flushBatch(batch) {
  if (!batch || batch.length === 0) {
    return;
  }

  const values = [];
  const placeholders = batch.map(() => "(?, ?, ?, ?, ?)").join(",");

  for (const e of batch) {
    const ts =
      e.timestamp instanceof Date ? e.timestamp : new Date(e.timestamp);
    const formatted = ts.toISOString().slice(0, 19).replace("T", " ");
    values.push(e.site_id, e.event_type, e.path, e.user_id, formatted);
  }

  const sql = `INSERT INTO events (site_id, event_type, path, user_id, timestamp) VALUES ${placeholders}`;

  try {
    await database.execute(sql, values);
    console.log(`Values of ${batch.length} events inserted into Database`);
  } catch (err) {
    console.error("Values insertion into databadatabase failed", err);
    eventQueue.unshift(...batch);
  }
}

setInterval(async () => {
  if (e_queue.length === 0) {
    return;
  }

  const batch = e_queue.splice(0, BATCH_SIZE);
  await flushBatch(batch);
}, INTERVAL_MS);
