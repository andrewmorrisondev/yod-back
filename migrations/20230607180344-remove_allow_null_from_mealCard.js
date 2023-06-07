'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('MealCards', 'photo', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('MealCards', 'photo', {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
};
