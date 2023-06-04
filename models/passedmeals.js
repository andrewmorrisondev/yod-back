'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PassedMeals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PassedMeals.belongsTo(models.Profile, { foreignKey: 'swiperId' })
      PassedMeals.belongsTo(models.MealCard, { foreignKey: 'mealCardId' })
    }
  }
  PassedMeals.init({
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
    modelName: 'PassedMeals',
  });
  return PassedMeals;
};