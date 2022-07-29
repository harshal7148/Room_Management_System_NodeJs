const joi = require('@hapi/joi');

const schema = {
    tenant: joi.object({
        roomNo : joi.string().max(3).message("maxlength is 4").required(),
        name :  joi.string().max(30).required(),
        address : joi.string().max(50).required(),
        uin : joi.string().max(12).pattern(new RegExp("^[0-9]*$")).required(),
        depositAmount : joi.string().max(10).pattern(new RegExp("^[0-9]*$")).required(),
        rentStartDate : joi.number().required(),
        //profilePic : joi.string().required(),
        isActive :  joi.boolean().required()
    })
 } 

 module.exports = schema;
