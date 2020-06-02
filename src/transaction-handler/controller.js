const map = require('./map');
const _ = require('lodash');
const { getMetadataConfig } = require('../../shared/db/metadata');
// var otpGenerator = require('otp-generator');
module.exports = function () {
    return {
        healthcheck(req, res) {
            map.healthcheck(req, res);
        },

        getAll(req, res) {
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            const { where, customizeQuery } = req.query;
            const { type, name, whereClause, baseQuery, order } = getMetadataConfig(model, 'list')['tableInfo'];
            let query;
            console.log(customizeQuery, "customizeQuery::::::")
            if (customizeQuery) {
                query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
            } else {
                const base = `${baseQuery}`;
                query = sequelize.query(base, { type: sequelize.QueryTypes.SELECT });
            }
            query.then(
                data => map.getAll(req, res, data),
                err => map.error(req, res, err),
            );
        },

        get(req, res) {
            console.log('hhhhhhhhello');
            
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            const { where, customizeQuery } = req.query;
            const { type, name, whereClause, baseQuery, order } = getMetadataConfig(model, 'list')['tableInfo'];
            let query;
            console.log(customizeQuery, "getcustomizeQuery::::::");
            if (customizeQuery) {
                query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
            } else {
                console.log("elseeeeeeeeeeeeeeee");
                const base = `${baseQuery} where ${whereClause}`;
                query = sequelize.query(base, { type: sequelize.QueryTypes.SELECT });
            }
            console.log("testtttttttttttttttt");
            query.then(   
                // console.log("hlooooooooooooo"),
                data => map.get(req, res, data),
                err => map.error(req, res, err),
            );
        },

        post(req, res) {
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            console.log("req.body111",req.body);
            _.get(global.components.dbConnections, model,'').create(req.body).then(
                data => map.post(req, res, data),
                err => map.error(req, res, err)
            )
        },
        put(req, res) {
            console.log('nnnkjdfgh');      
            const model = req.originalUrl.split("/")[3];
            const { id } = req.params;
            const { type, name, whereClause, baseQuery, order } = getMetadataConfig(model, 'list')['tableInfo'];
            console.log(req.body, id, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            _.get(global.components.dbConnections, model, '').update(req.body, { where: { [whereClause]: id } }).then(
                data => map.put(req, res, data),
                err => map.error(req, res, err)
            );
        },
        delete(req,res){
            console.log("deviiiiiiiiiiiiiiiiiiiiii")
            const model = req.originalUrl.split("/")[3];
            const { sequelize } = global.components;
            const { where, customizeQuery } = req.query;
            const { type, name, whereClause, baseQuery, order } = getMetadataConfig(model, 'list')['tableInfo'];
            let query;
            console.log(customizeQuery, "customizeQuery::::::",req.query,req.params)
                query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
            query.then(
                data => {
                    console.log("iddddddddddddddd",req.params.id);
                    if(data.length>0){
                        _.get(global.components.dbConnections, model, '').update({Isactive: "InActive"}, { where: { [whereClause]:req.params.id } }).then(
                            data => map.delete(req, res, data),
                            console.log("checkkkkkkkk")
                        )} 
                },
                console.log("check2222222"),
                err => map.error(req, res, err),
            ); 
        }
        // get(req,res){
        //     console.log('Norshashaik');
            
        //     const model = req.originalUrl.split("/")[3];
        //     const { sequelize } = global.components;
        //     const { where, customizeQuery } = req.query;
        //     const { type, name, whereClause, baseQuery, order } = getMetadataConfig(model, 'list')['tableInfo'];
        //     let query;
        //     console.log(customizeQuery, "customizeQuery::::::")
        //         query = sequelize.query(customizeQuery, { type: sequelize.QueryTypes.SELECT });
        //     query.then(
        //         data => {
        //             if(data.length>0){
        //                 _.get(global.components.dbConnections, model, '').update(req.body, { where: { [whereClause]: req.query.id } }).then(
        //                 )} 

        //         },
        //         err => map.error(req, res, err),
        //     ); 
        // }

    }
}();
