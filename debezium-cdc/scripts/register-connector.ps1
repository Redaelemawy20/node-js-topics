# Registers the Debezium MySQL connector with Kafka Connect (same payload as README curl).
# Requires: Connect reachable at localhost:8083 (docker compose up).
# Optional env: CONNECT_URL (default http://localhost:8083/connectors)

$ErrorActionPreference = 'Stop'
$connectUrl = if ($env:CONNECT_URL) { $env:CONNECT_URL } else { 'http://localhost:8083/connectors' }

$config = [ordered]@{
  'connector.class'                = 'io.debezium.connector.mysql.MySqlConnector'
  'tasks.max'                        = '1'
  'database.hostname'                = 'mysql'
  'database.port'                    = '3306'
  'database.user'                    = 'debezium'
  'database.password'               = 'dbz'
  'database.server.id'               = '184054'
  'topic.prefix'                     = 'orders_db'
  'database.include.list'            = 'orders'
  'table.include.list'               = 'orders.orders'
  'database.history.kafka.bootstrap.servers' = 'kafka:29092'
  'database.history.kafka.topic'     = 'schema-changes.orders'
}

$body = [ordered]@{
  name   = 'mysql-orders-connector'
  config = $config
}

$json = $body | ConvertTo-Json -Depth 6 -Compress
Write-Host "POST $connectUrl"
try {
  Invoke-RestMethod -Method Post -Uri $connectUrl -ContentType 'application/json; charset=utf-8' -Body $json
  Write-Host "Done. Check: GET $connectUrl/mysql-orders-connector/status"
} catch {
  $resp = $_.ErrorDetails.Message
  if ($resp) { Write-Host $resp }
  throw
}
