import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Contract = sequelize.define('Contract', {
  contract_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  originator_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  responder_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lawyer_id: DataTypes.INTEGER,
  template_id: DataTypes.INTEGER,
  
 
  file_path: DataTypes.STRING(255),
  sha256_hash: DataTypes.STRING(64),
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fully_signed_at: DataTypes.DATE,
  contract_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contract_type: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'contracts',
  timestamps: false,
}); 