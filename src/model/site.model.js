import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

export const Sites = sequelize.define("site", {
  Device_Type: {
    type: DataTypes.STRING,
  },
  POI_NAME_XL_BEFORE: {
    type: DataTypes.STRING,
  },
  Kode_Site_DUKCAPIL: {
    type: DataTypes.STRING(12),
    allowNull: false,
  },
  Site_Name_DUKCAPIL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Hostname_POI_NAME_DUKCAPIL_AFTER: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  MPLS_Partner: {
    type: DataTypes.STRING,
  },
  Remarks: {
    type: DataTypes.TEXT,
  },
  Segment_IP_Address_WAN: {
    type: DataTypes.STRING(20),
  },
  Segment_IP_Address_LAN: {
    type: DataTypes.STRING(20),
  },
});
