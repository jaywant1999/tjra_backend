# tjra_backend
This is recruiting assignment from TJRA reatils for position of full stackdeveloper intern

# Analytics System (Node + Express + MySQL) — In-Memory Queue

This repository implements a simple analytics ingestion → processing → reporting system.
It demonstrates an asynchronous ingestion design that keeps the ingestion API extremely fast by pushing events into an in-memory queue, while a background processor flushes batches to MySQL.


## Requirements
- Node.js (v14+)
- MySQL (or MariaDB)
- VS Code (recommended)


## Setup
1. Clone or extract the project.
2. Install dependencies:

## Architecture -
- **Ingestion** API (POST /event) receives events, validates them, and immediately pushes the event into an in-memory queue (queue.js) and returns success to the client — no waiting for a database write.

- **Processor** worker (background task) periodically pulls a batch of events from the in-memory queue and performs a single batch INSERT into MySQL.

- **Reporting** API (GET /stats) reads inserted data from MySQL and returns summaries (total views, unique users, top paths).

## Database Schema - 
- sql queries - 
    - CREATE DATABASE IF NOT EXISTS analytics_db;
    - USE analytics_db;

    - CREATE TABLE IF NOT EXISTS events (id BIGINT PRIMARY KEY AUTO_INCREMENT, site_id VARCHAR(255) NOT NULL, event_type VARCHAR(100) NOT NULL, path VARCHAR(255), user_id VARCHAR(255), timestamp DATETIME );

## Setup Instructions - 
    - These instructions assume you have Node.js and MySQL installed locally and that you are running the services in the same Node   process (required so the in-memory queue is shared).
    - clone project from this github link 'https://github.com/jaywant1999/tjra_backend.git' (git clone https://github.com/jaywant1999/tjra_backend.git)

    - command 
        - cd tjra_backend
        - npm install
        - npm start

## API Testing -
- http://localhost:2025/event
- http://localhost:2026/stats?site_id=site-111 (site-111 is site_id it can be different in your case)

