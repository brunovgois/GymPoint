"use strict";

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "plans",
      [
        {
          title: "Start",
          price: 129,
          duration: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: "Gold",
          price: 109,
          duration: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: "Diamond",
          price: 89,
          duration: 6,
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: () => {}
};
