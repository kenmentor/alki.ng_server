/** @format */

const { QueryInterface } = require("sequelize");
const { defaultValueSchemable } = require("sequelize/lib/utils");
/*
 thumnail:'',
    title: "",
    description: "",
    contact_num:'080',
    price: 0,
    state: "",
    LGA: "",
    country: "",
    professional_job: false,
    casual_job: false,
    remote_job: false,
    type: false,
  });
*/
module.exports = (sequelize, DataType, queryInterface) => {
  const post = sequelize.define("posts", {
    thumbnail: {
      type: DataType.STRING,
      allowNull: true,
      defaultValue: "jujgugugugug",
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    description: {
      type: DataType.TEXT,
      allowNull: false,
    },
    contact_num: {
      type: DataType.STRING,
      allowNull: false,
    },
    price: {
      type: DataType.STRING,
      allowNull: false,
    },
    state: {
      type: DataType.STRING,
      allowNull: false,
    },
    LGA: {
      type: DataType.STRING,
      allowNull: false,
    },

    country: {
      type: DataType.STRING,
      allowNull: false,
    },
    lon: {
      type: DataType.STRING,
      allowNull: true,
      defaultValue: "3333333",
    },
    lat: {
      type: DataType.STRING,
      allowNull: true,
      defaultValue: "3333333",
    },
    type: {
      type: DataType.STRING,
      allowNull: false,
    },

    username: {
      type: DataType.STRING,
      allowNull: true,
      defaultValue: "mentor",
    },
  });
  (async () => {
    try {
      console.log("Connection has been established successfully.");

      // Define the raw SQL query to create a full-text index
      const createFullTextIndexQuery = `
      ALTER TABLE POSTS
      ADD FULLTEXT(DESCRIPTION);
    `;

      // Execute the query
      await sequelize.query(createFullTextIndexQuery);
      console.log("Full-text index created successfully.");

      // Close the connection
    } catch (error) {
      console.error(
        "Unable to connect to the database or execute query:",
        error
      );
    }
  })();

  return post;
};
