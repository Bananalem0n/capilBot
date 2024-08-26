import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

export const Sites = sequelize.define("prod_site", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  kode: {
    type: DataTypes.INTEGER,
  },
  site_id: {
    type: DataTypes.STRING(32),
  },
  status_link_wan: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  kab_kota: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  mitra_MPLS: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  bandwidth: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ip_router_xl: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  ip_wan_fortigate: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  network_ip_lan: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  ip_lan_xl: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  ip_lan_telkom: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  ip_vip_vrrp: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
});
