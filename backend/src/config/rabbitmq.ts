import amqp, { Connection, Channel } from "amqplib";

let connection: Connection;
let channel: Channel;

export async function connectRabbitMQ() {
  connection = await amqp.connect(process.env.RABBITMQ_URL!);
  channel = await connection.createChannel();
  await channel.assertExchange("chat.exchange", "topic", { durable: true });
  console.log("RabbitMQ connected");
}

export function getChannel() {
  if (!channel) throw new Error("Channel not initialized");
  return channel;
}
