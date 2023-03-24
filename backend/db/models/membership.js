'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Membership.belongsTo(models.User, {
        foreignKey: 'id'
      })
      Membership.belongsTo(models.Group, {
        foreignKey: 'id'
      })
    }
  }
  Membership.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      },
      onDelete: 'cascade'
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Groups'
      },
      onDelete: 'cascade'
    },
    status: {
      type: DataTypes.ENUM('Organizer(host)', 'Co-host', 'Member', 'Pending'),
      allowNull: false,
      validate: {
        isIn: [['Organizer(host)', 'Co-host', 'Member', 'Pending']]
      }
    },
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};
