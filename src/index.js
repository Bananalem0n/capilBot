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
  // Make the callback async
  const chatId = msg.chat.id;
  const site = `${match[1]}`;

  try {
    const data = await fetchSite(site);

    // Check if data is found and prepare a message to send
    if (data.length > 0) {
      const siteInfo = data
        .map(
          (site) => `Kode Site : ${site.Hostname_POI_NAME_DUKCAPIL_AFTER}\nIP WAN : ${site.Segment_IP_Address_WAN}\nIP LAN: ${site.Segment_IP_Address_LAN}\nPartner : ${site.MPLS_Partner}\nRemarks: ${site.Remarks}`
        ).join("\n");

      bot.sendMessage(chatId, siteInfo);
    } else {
      bot.sendMessage(chatId, "No site found with the given ID.");
    }
  } catch (error) {
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the site information."
    );
    console.error(error);
  }
});

const fetchSite = async (site_id) => {
  const data = await Sites.findAll({
    where: {
      Kode_Site_DUKCAPIL: site_id
    }
  });
  return data;
};
