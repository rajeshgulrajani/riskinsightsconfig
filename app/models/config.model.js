module.exports = (sequelize, Sequelize) => {
    const Config = sequelize.define("Config", {
      /*title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      }*/
      type: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.JSONB,
      }
    });

    return Config;
  };