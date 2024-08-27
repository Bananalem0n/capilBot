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

// Pre-Test Command
bot.onText(/\/pretest/, (msg) => {
  const chatId = msg.chat.id;
  const threadId = msg.message_thread_id;

  const pretestInstructions = `
  ===Pre-Test=== 
  
  1. Foto Ransnet (Keliatan Port dan kode POI)
  2. ipconfig /all (di pc pic)
  3. tracert -d 192.168.150.31 (di pic)
  4. Foto ModemXL (ipaso/lintas/modemstar/RTN)
  5. colok laptop ke modem xl (ipaso/lintas/modemstar)
  6. test ptp (Tag Bot)
  7. ping 10.172.6.222
  8. ping 10.171.20.234
  `;

  bot.sendMessage(chatId, pretestInstructions, { message_thread_id: threadId });
});

// Before Migration Command
bot.onText(/\/before/, (msg) => {
  const chatId = msg.chat.id;
  const threadId = msg.message_thread_id;

  const beforeMigrasiInstructions = `
  ===Before Migrasi=== 

  0.1 Foto Lokasi Gedung
  0.2 Foto Lokasi Ruangan Perangkat Existing (dari jauh)
  0.3 Capture Perangkat Fortinet
  0.4 Capture SN Perangkat Fortinet
  0.5 Capture SN Ruijie
  0.6 Foto Sebelum Pemasangan Perangkat
  2.1 Capture SIAK Terpusat Client
  2.2 Capture Perekaman Benroller
  2.3 Capture Percetakan BCardMgmt
  `;

  bot.sendMessage(chatId, beforeMigrasiInstructions, { message_thread_id: threadId });
});

// Inject Script Command
bot.onText(/\/after/, (msg) => {
  const chatId = msg.chat.id;
  const threadId = msg.message_thread_id;

  const injectScriptInstructions = `
  ===Inject Script===
  9. Push Telkom test Telkom Config (Laptop > Switch Existing)
  6.1 Capture Overview FortinetSDWAN
  6.2 Capture Overview Ruijie Switch

  ===Discovery Topology & After Migrasi=== 
  1.1 Ping Gateway WAN XL dari Fortinet
  1.2 Ping 10.172.6.222 Dari Fortinet
  1.3 Ping 10.171.20.234 Dari Fortinet
  1.4 Ipconfig PC Admin
  1.5 Ping 192.168.150.31
  1.6 Ping 172.16.232.231
  1.7 Ping 172.16.235.17
  1.8 Ping 172.16.105.10
  1.9 SpeedTest http://172.16.105.10
  3.1 Capture SIAK Terpusat Client
  3.2 Capture Perekaman Benroller
  3.3 Capture Percetakan BCardMgmt

  ===Cabut WAN Forti Port 1 (Telkom Only)=== 
  4.1 ping 172.16.232.231
  4.2 ping 172.16.235.17
  4.3 tracert 172.16.232.231
  4.4 tracert 172.16.235.17
  4.5 capture Perekaman benroller
  4.6 capture perekaman bcardmgmt

  ===Colok WAN Forti Port 1 dan matikan ransnet===
  5.1 ping 192.168.150.31
  5.2 tracert 192.168.150.31
  5.3 Capture SIAK Terpusat
  
  ====Finishing dan NYALAKAN RANSNET=== 
  0.7 Capture Sesudah Pemasangan Perangkat
  7.1 UAT
  7.2 DO
  6.3 Capture Overview Dashboard Fortimanager
  `;

  bot.sendMessage(chatId, injectScriptInstructions, { message_thread_id: threadId });
});

bot.onText(/\/ptp (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const threadId = msg.message_thread_id;
  const data = `${match[1]}`;

  try {
    const siteData = await fetchPTP(data);

    if (siteData) {
      const ptpInfo = `IP : ${siteData.ip_wan_fortigate}\nSubnet : 255.255.255.252\nGateway : ${siteData.ip_router_xl}`;
      bot.sendMessage(chatId, ptpInfo, { message_thread_id: threadId });
    } else {
      bot.sendMessage(chatId, "No site found with the given ID.", { message_thread_id: threadId });
    }
  } catch (error) {
    bot.sendMessage(chatId, "An error occurred while fetching the site information.", { message_thread_id: threadId });
    console.error(error);
  }
});

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
      kode: site_id 
    }
  });
  return data;
};

const fetchPTP = async (topicName) => {

  const data = await Sites.findOne({
    attributes: ['site_id', 'ip_router_xl', 'ip_wan_fortigate'],
    where: {
      kode: topicName,
    },
  });

  return data;
};
