'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Event, {
        through: 'Attendance',
        foreignKey: 'eventId'
      })
      User.hasMany(models.Membership, {
        foreignKey: 'userId'
      })
      User.hasMany(models.Attendance, {
        foreignKey: 'userId'
      })
      User.hasMany(models.Group, {
        foreignKey: 'organizerId',
        as: 'Organizer'
      })
      User.belongsToMany(models.Group, {
        through: 'Membership',
        foreignKey: 'userId',
        otherKey: 'groupId'
      })
      User.belongsTo(models.Event, {
        through: 'Attendance',
        foreignKey: 'userId',
        otherKey: 'eventId'
      })

    }
  };

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: "User",
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  }
  );
  return User;
};
