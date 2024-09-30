const { defaultValueSchemable } = require("sequelize/lib/utils")

module.exports = (sequelize,DataType)=>{

    const bussAdd = sequelize.define('bussAdd',{
        thumbnail:{
            type:DataType.BLOB,
            allowNull:true,
            defaultValue:'jujgugugugug'
        },
        name:{
            type:DataType.STRING,
            allowNull:false
        },
        description:{
            type:DataType.STRING,
            allowNull:false
        },
        image1:{
            type:DataType.BLOB,
            allowNull:true
        },
        image2:{
            type:DataType.BLOB,
            allowNull:true
        },
        image3:{
            type:DataType.BLOB,
            allowNull:true
        },
        state:{
            type:DataType.STRING,
            allowNull:false
        },
        LGA:{
            type:DataType.STRING,
            allowNull:false
        },
        username:{
            type:DataType.STRING,
            allowNull:true,
            defaultValue:'mentor'
        }
        

    })
    return(bussAdd)
}