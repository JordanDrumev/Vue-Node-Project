//The model for the user
module.exports = (sequelize, Sequelize) => {   
    const Users = sequelize.define("users", {
        user_email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return Users;
};