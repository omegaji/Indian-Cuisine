const { emit } = require('pouchdb');
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

var jsond =require("../indian_food.json")

console.log("json loaded")
var db= new PouchDB("mydb")
db.info().then((details)=>{
    if (details.doc_count<10){
        db.bulkDocs(jsond)
          .then((result)=>{
            console.log("its loaded")
        })
        .catch((err)=>{
            console.log(err)
        })

    }
   
    
})


exports.dbCount=(req,res)=>{    
    var toreturn=-1;
    console.log("in this dbcount")
    db.allDocs({include_docs:true})
    .then((docs)=>{
        
    return res.json({"length":docs.rows.length})
    })
    .catch((err)=>{console.log("yo")})
   

}
exports.getFlavorState=(req,res)=>{
    var myMapReduceFun = {
     
        map: function (doc) {
            if(doc.state){
               emit([doc.state,doc.flavor_profile],1)
            }
        },
        reduce: '_count'
      };

     db.query(myMapReduceFun, { startkey:[req.body.data],endkey:[req.body.data,{}],
        reduce: true, group: true
      }).then(function (result) {
          return res.json({"out":result})
        // handle result
      }).catch(function (err) {
          console.log(err)
        // handle errors
      });
        

}

exports.dbFind=(req,res)=>{
  console.log("in dbfind")
  db.createIndex({index:{fields:["name","flavor_profile"]}})
    .then(()=>{
      console.log(req.body.flavor)
      db.find({
        selector:{
          state: {$eq: req.body.state},
          flavor_profile: {$eq: req.body.flavor}
          // flavor_profile: req.body.flavor
        },
        limit:3,
     
      },
     )
     .then((result)=>{
      return res.json(
        {"out":result["docs"]}
      )
    })
    })
}

exports.dbGetReciepe=(req,res)=>{
  db.createIndex({index:{fields:["name"]}})
    .then(()=>{
      db.find({
        selector: {
          name: {$gte: req.body.data}
        },
      
        limit:3
      }).then((result)=>{
        return res.json(
          {"out":result}
        )
      })

  })
    .catch((err)=>{
      console.log(err)
    })

  

}
exports.dbtest=(req,res)=>{
    var myMapReduceFun = {
        map: function (doc) {
            if(doc.state=="Gujarat"){
                emit([doc.state,doc.flavor_profile])

            }
        },
        reduce: '_count'
      };

     db.query(myMapReduceFun, {
        reduce: true, group: true
      }).then(function (result) {
          return res.json({"out":result})
        // handle result
      }).catch(function (err) {
        // handle errors
      });


}
exports.controller1=(req,res)=>{
    console.log("its done")
    return res.json({
        "name":"dom"

    })
    
}