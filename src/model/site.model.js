import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

export const Sites = sequelize.define("prod_site", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Site_ID_DUKCAPIL: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Status_Link_WAN: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },
  KAB_KOTA: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Kode: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  Alamat: {
    type: DataTypes.STRING(110),
    allowNull: true,
  },
  IP_Router_XL: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  IP_WAN_Fortigate_or_laptop: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  network_IP_LAN: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  IP_LAN_XL: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  IP_LAN_Telkom: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  IP_VIP_VRRP: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
});
