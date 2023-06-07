'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MealCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MealCard.belongsTo(models.Profile, { foreignKey: 'creatorId' })
      MealCard.hasMany(models.LikedMeals, { foreignKey: 'mealCardId' })
    }
  }
  MealCard.init({
    photo: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resturantName: {
      type: DataTypes.STRING,
    },
    resturantAddress: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'MealCard',
  });
  return MealCard;
};