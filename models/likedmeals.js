'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikedMeals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LikedMeals.belongsTo(models.Profile, { foreignKey: 'swiperId' })
      LikedMeals.belongsTo(models.MealCard, { foreignKey: 'mealCardId' })
    }
  }
  LikedMeals.init({
    swiperId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      },
    },
    mealCardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'MealCards',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'LikedMeals',
  });
  return LikedMeals;
};