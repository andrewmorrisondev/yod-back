'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Promise.all([
      queryInterface.addColumn('MealCards', 'ResturantName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('MealCards', 'ResturantAddress', {
        type: Sequelize.STRING
      }),
    ]);      
  },

  async down (queryInterface, Sequelize) {
    Promise.all([
      queryInterface.removeColumn('MealCards', 'ResturantName'),
      queryInterface.removeColumn('MealCards', 'ResturantAddress'),
    ]);
  }
};
