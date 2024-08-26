import TelegramBot from "node-telegram-bot-api";
import { sequelize } from "./config/sequelize.config.js";
import { Sites } from "./model/site.model.js";
import "dotenv/config";

// eslint-disable-next-line no-undef
const token = process.env.BOT_TOKEN ?? "";
const bot = new TelegramBot(token, { polling: true });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

bot.onText(/\/info (\d+)/, async (msg, match) => {
  // Get the chat ID and the message thread ID
  const chatId = msg.chat.id;
  const threadId = msg.message_thread_id;
  const site = `${match[1]}`;

  try {
    const data = await fetchSite(site);

    if (data.length > 0) {
      const siteInfo = data.map((site) => {
        let info = '';
        for (const [key, value] of Object.entries(site.dataValues)) {
          if (key !== "id" && key !== "kode") {
            info += `${key}: ${value}\n`;
          }
        }
        return info;
      }).join("\n");

      // Use threadId in the sendMessage call
      bot.sendMessage(chatId, siteInfo, { message_thread_id: threadId });
    } else {
      bot.sendMessage(chatId, "No site found with the given ID.", { message_thread_id: threadId });
    }
  } catch (error) {
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the site information.",
      { message_thread_id: threadId }
    );
    console.error(error);
  }
});


const fetchSite = async (site_id) => {
  const data = await Sites.findAll({
    where: {
      kode: site_id // Use the 'Kode' field as per the updated schema
    }
  });
  return data;
};

