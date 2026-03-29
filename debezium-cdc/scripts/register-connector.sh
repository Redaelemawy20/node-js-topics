#!/usr/bin/env bash
# Registers the Debezium MySQL connector with Kafka Connect (same payload as README curl).
# Requires: Connect reachable at localhost:8083 (docker compose up).
# Optional env: CONNECT_URL (default http://localhost:8083/connectors)

set -euo pipefail

CONNECT_URL="${CONNECT_URL:-http://localhost:8083/connectors}"

echo "POST ${CONNECT_URL}"
curl -sS -f -w "\nHTTP %{http_code}\n" -X POST -H "Content-Type: application/json" \
  --data '{
  "name": "mysql-orders-connector",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "tasks.max": "1",
    "database.hostname": "mysql",
    "database.port": "3306",
    "database.user": "debezium",
    "database.password": "dbz",
    "database.server.id": "184054",
    "topic.prefix": "orders_db",
    "database.include.list": "orders",
    "table.include.list": "orders.orders",
    "schema.history.internal.kafka.bootstrap.servers": "kafka:29092",
    "schema.history.internal.kafka.topic": "schema-changes.orders"
  }
}' "${CONNECT_URL}"

echo ""
echo "Check status: curl ${CONNECT_URL}/mysql-orders-connector/status"
