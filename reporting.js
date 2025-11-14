const express = require("express");
const database = require("./database");

const app = express();

app.get("/stats", async (req, res) => {
  try {
    const { site_id, date } = req.query;

    if (!site_id) {
      return res.status(400).json({
        message: "site_id is not found",
      });
    }

    let where = "site_id = ?";
    const params = [site_id];

    if (date) {
      where += "AND DATE(timestamp) = ?";
      params.push(date);
    }

    const [summaryRows] = await database.execute(
      `SELECT COUNT(*) AS total_views, COUNT(DISTINCT user_id) AS unique_users FROM events WHERE ${where}`,
      params
    );

    const summary = summaryRows[0] || { total_views: 0, unique_users: 0 };

    const [pathsRows] = await database.execute(
      `SELECT path, COUNT(*) AS views FROM events WHERE ${where} GROUP BY path ORDER BY views DESC LIMIT 3`,
      params
    );

    res.json({
      site_id,
      date: date || "all",
      total_views: summary.total_views || 0,
      unique_users: summary.unique_users || 0,
      top_paths: pathsRows,
    });


  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

const PORT = 2026;
app.listen(PORT, () => console.log(`Reporting API is running on port ${PORT}`));