const { Kafka } = require("kafkajs");

const brokers = (process.env.KAFKA_BROKERS || "localhost:9092")
  .split(",")
  .map((s) => s.trim());
const topic = process.env.KAFKA_TOPIC || "orders_db.orders.orders";
const groupId = process.env.KAFKA_GROUP_ID || "reporting-group";

const kafka = new Kafka({ clientId: "reporting-app", brokers });
const consumer = kafka.consumer({ groupId });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      console.log("CDC event:", JSON.stringify(event, null, 2));
    },
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
