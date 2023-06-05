'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Promise.all([
      await queryInterface.renameColumn('MealCards', 'ResturantName', 'resturantName'),
      await queryInterface.renameColumn('MealCards', 'ResturantAddress', 'resturantAddress'),
    ]);
  },

  async down (queryInterface, Sequelize) {
    Promise.all([
      await queryInterface.renameColumn('MealCards', 'resturantName', 'ResturantName'),
      await queryInterface.renameColumn('MealCards', 'resturantAddress', 'ResturantAddress'),
    ]);
  }
};
