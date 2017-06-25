'use strict';

module.exports = function(sequelize, DataTypes) {
  var Books = sequelize.define('Books', {
      id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Author is required"
        }
      }
    },
    genre: {
   type: DataTypes.STRING,
   validate: {
     notEmpty: {
       msg: "Genre is required"
     }
   }
 },
    first_published: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
				Book.hasMany(models.Loan, {foreignKey: 'book_id'});
			}
    },
    timestamps: false
  });
  return Books;
};