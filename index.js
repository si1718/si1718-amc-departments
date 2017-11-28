"use strict";
/* global __dirname */

var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID
var helmet = require("helmet");
var path = require('path');


var mdbURL = "mongodb://alex:alex@ds151355.mlab.com:51355/si1718-amc-departments";


var app = express();
app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.json());
app.use(helmet());

var baseURL = "/api/v1";
var conflictId = 0;
//var departments = [];

var db;

/*///////////////////////////////////////////////////////////////////////////////*/

MongoClient.connect(mdbURL,{native_parser:true},(err,database) =>{
    
     if(err){
        console.log("CAN NOT CONNECT TO DB: "+err);
        process.exit(1);
    }
    
    db = database.collection("departments");

});


/*///////////////////////////////////////////////////////////////////////////////*/

/* Get Id from department's name */
function createId(department){
    
    let chars = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','ñ':'nn'};
    let sL = department.length;
    let initials = "";
    
    for (let i = 0; i < sL; i++) {
        if (department.charAt(i) != " " && department.charAt(i) === department.charAt(i).toUpperCase()) {
            
            initials += department.charAt(i);
        }
    }
    //initials += "-" + Math.round((Math.floor(Math.random() * (1000 - 0)) + 0));
    initials = initials.toLowerCase().replace(/[áéíóúñ]/g, m => chars[m]);

    db.findOne({"idDepartment" : initials}, function (err, filtered) {
        if(filtered){
            conflictId++;
            if(conflictId<=50){
                createId(department);
            }
        }else{
            conflictId=0;
        }
        
    });
    return initials;
}


/*Get all departements
app.get(baseURL + "/departments", function (request, response) {
    db.find({}).toArray( function (err, departments) {
        if (err) {
            response.sendStatus(500); // internal server error
        } else {
            response.send(departments);
        }
    });
});*/

/*Get url params*/
//app.get(baseURL + "/departments/search", function (request, response) {
app.get(baseURL + "/departments", function (request, response) {

    
    let req_department = request.query.department;
    let req_school = request.query.school;
    let req_researcher = request.query.researcher;
    let req_category = request.query.category;
    
    let req_tlf = request.query.tlf;
    let req_fax = request.query.fax;
    let req_web = request.query.web;
    var db_query = {"$and": []};

    if(req_department){
        db_query.$and.push({"department" : {$regex : ".*"+req_department+".*"}});
    }
    if(req_school){
        db_query.$and.push({"address": {$elemMatch: {"school": {$regex: ".*"+req_school+".*"}}}});
    }
    if(req_tlf){
        db_query.$and.push({"address": {$elemMatch: {"tlf": {$regex: ".*"+req_tlf+".*"}}}});
    }
    if(req_fax){
        db_query.$and.push({"address": {$elemMatch: {"fax": {$regex: ".*"+req_fax+".*"}}}});
    }
    if(req_web){
        db_query.$and.push({"address": {$elemMatch: {"web": {$regex: ".*"+req_web+".*"}}}});
    }
    if(req_researcher){
        db_query.$and.push({"researchers": {$elemMatch: {"name": {$regex: ".*"+req_researcher+".*"}}}});
        //db_query.$and.push({"researchers": {$elemMatch: {".*": {$regex: ".*"+req_researcher+".*"}}}});
    }
    if(req_category){
        db_query.$and.push({"researchers": {$elemMatch: {"category": {$regex: ".*"+req_category+".*"}}}});
    }


    db.find(db_query).toArray( function (err, departments) {
        
        if (err) {
            response.sendStatus(500); // internal server error
        } else {
            response.send(departments);
        }
    });
});


/*Get department by id*/

app.get(baseURL + '/departments/:id', function(req, res) {
    
    var id = req.params.id;

    db.findOne({"idDepartment" : id}, function (err, filtered) {
        var department = filtered; 
        res.send(department);
    });
});
    



/*Insert a new department*/
app.post(baseURL + '/departments', function(req, res) {
    
    var id = createId(req.body.department);  
    //var id = req.body.idDepartment;

    var array = [{school:req.body.address.school,tlf:req.body.address.tlf,fax:req.body.address.fax,web:req.body.address.web}];
    req.body.address = array;


    db.findOne({ "idDepartment": id }, function(err, element) {
        if (err) {
            res.sendStatus(500); // internal server error
        }
        else {
            if (element) {
                res.sendStatus(409); // conflict
            }
            else {
                req.body['idDepartment'] = id;
                db.insertOne(req.body, (err, result) => {
                    if (err) {
                        res.sendStatus(500); // internal server error
                    } else {
                        res.sendStatus(201);
                    }
                });
            }
        }
    });
});

/*Error insert existing resource*/
app.post(baseURL + "/departments/:id", function (req, res) {
    res.sendStatus(405);
});


/*Delete single department*/
app.delete(baseURL + "/departments/:id", function (request, response) {
    var id = request.params.id;
    if (!id) {
        response.sendStatus(400); // bad request
    } else {
        db.remove({idDepartment: id}, {}, function (err, numRemoved) {
            if (err) {
                response.sendStatus(500); // internal server error
            } else {
                if (numRemoved.result.n === 1) {
                    response.sendStatus(204); // no content
                } else {
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});

/*Delete all departments*/
app.delete(baseURL + '/departments', function(req, res) {
    
    db.remove({}, {multi: true});
    
    res.send();
    
});


app.put(baseURL + "/departments", function (req, res) {
    res.sendStatus(405);
});


//PUT over a single resource
app.put(baseURL + "/departments/:id", function (request, response) {
    var updatedDepartment = request.body;
    var id = request.params.id;
    if (!updatedDepartment) {
        response.sendStatus(400); // bad request
    } else {
        if (!updatedDepartment.department) {
            response.sendStatus(422); // unprocessable entity
        } else {
            db.findOne({"idDepartment":id}, function (err, department) {
                if (err) {
                    response.sendStatus(500); // internal server error
                } else {
                    /*var departmentsBeforeInsertion = departments.filter((department) => {
                        return (department.id.localeCompare(id, "en", {'sensitivity': 'base'}) === 0);*/
                   // });
                    if (department) {
                        if ( updatedDepartment._id && ( typeof(updatedDepartment._id) === 'string' ) ) {
                            updatedDepartment._id = ObjectID.createFromHexString(updatedDepartment._id);
                        }
                        updatedDepartment.idDepartment = createId(updatedDepartment.department);
                        if(!updatedDepartment.department){
                            updatedDepartment.department = "";
                        }
                        if(updatedDepartment.address){
                            
                            if(!updatedDepartment.address[0].school){
                                updatedDepartment.address[0].school = "";
                            }
                            if(!updatedDepartment.address[0].tlf){
                                updatedDepartment.address[0].tlf = "";
                            }
                            if(!updatedDepartment.address[0].web){
                                updatedDepartment.address[0].web = "";
                            }
                            if(!updatedDepartment.address[0].fax){
                                updatedDepartment.address[0].fax = "";
                            }
                        }else{
                            updatedDepartment["address"]=[];
                        }
                        
                        if(!updatedDepartment.researchers){
                            updatedDepartment.researchers = [];
                        }
                        
                        
                        db.updateOne({idDepartment: id}, updatedDepartment);
                        response.send(updatedDepartment); // return the updated department
                    } else {
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});




app.listen(process.env.PORT);