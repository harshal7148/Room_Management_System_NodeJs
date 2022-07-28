var formidable = require("formidable");

const {tenant} = require('./tenant.schema')

//value = "";

module.exports = {
    addTenantValidation : async(req, res, next)  =>{
        const form = formidable({ multiples: true });
        form.parse(req, async(err, fields, files) => {
            const value = await tenant.validate(JSON.parse(fields.params));
            if(value.error){
                res.send({
                    success : 0,
                    message: value.error.details[0].message
                })
                return;
            }
            else{
                // res.end();
                next();
            }
        });
    }

     // var formfields = await new Promise(function(resolve, reject) {
        //      // if (err) {
        //     //     reject(err);
        //     //     return;  
        //     // }
        //     //resolve(fields);
        // });
            //console.log(files);

           // return;
}