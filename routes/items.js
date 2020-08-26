var express = require('express');
var Item = require('../models/item');
const jwt = require("jsonwebtoken");
var router = express.Router();


// let page = req.query.page && req.query.page > 1 ? req.query.page : 1;
// let sort = req.query.sort
// let cat = req.query.category
// if(cat){
//     Item.find({category:cat})
//     .limit(10)
//     .skip((page - 1) * 10)
//     .sort({"price":sort})
//     .exec(function (err, items) {
//       if (err) {
//         res.send("error has occured");
//       } else {
//         console.log(books);
//         res.json(items);
//       }
//     });
// }
// else{
//   Item.find({})
//     .limit(10)
//     .skip((page - 1) * 10)
//     .sort({"price":sort})
//     .exec(function (err, items) {
//       if (err) {
//         res.send("error has occured");
//       } else {
//         console.log(books);
//         res.json(items);
//       }
//     });
// }


router.get('/', function(req, res){
    console.log('getting all items');
    console.log(req.query)
    let page = req.query.page && req.query.page > 1 ? req.query.page : 1;
            
        Item.find({})
            .limit(10)
            .skip((page - 1) * 10)
            .exec(function (err, items) {
            if (err) {
                res.send("error has occured");
            } else {
                console.log(items);
                res.json(items);
            }
            });
        }
);

router.get('/:id', function(req, res){
    console.log('getting all items');
    Item.find({_id:req.params.id}).exec(function(err, items){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(items);
            res.json({data:items,total:items.length});
        }
    });
});


router.get('/adminitems/:token', function(req, res){
    console.log('getting all items');
    jwt.verify(req.params.token, "secret_key", (err, tokenUserData) => {
        if (err) {
            return res.sendStatus(403);
        }
        console.log(tokenUserData)
        Item.find({posted_by:tokenUserData.id}).exec(function(err, items){
            if(err) {
                res.send('error has occured');
            } else {
                console.log(items);
                res.json(items);
            }
        });
    })
})
    
    
//     jwt.verify(
//         req.headers.authorization.replace("Bearer ", ""),
//         "secret_key",
//         function (err, tokenUserData) {
//             console.log(tokenUserData)
//           if (err) {
//             return res.sendStatus(403);
//           }
  
//           else {
//                 console.log(tokenUserData.id)
//                 Item.find({posted_by:tokenUserData.id}).exec(function(err, items){
//                     if(err) {
//                         res.send('error has occured');
//                     } else {
//                         console.log(items);
//                         res.json(items);
//                     }
//                 });
//             }
// });
// });

router.post('/', function(req, res){

    if (req.headers.authorization) {
        jwt.verify(
          req.headers.authorization.replace("Bearer ", ""),
          "secret_key",
          function (err, tokenUserData) {
              console.log(tokenUserData)
            if (err) {
              return res.sendStatus(403);
            }
    
            else {
                var newItem = new Item();
                newItem.category = req.body.category;
                newItem.image = req.body.image;
                newItem.price = req.body.price;
                newItem.rating = req.body.rating;
                newItem.posted_by = tokenUserData.id;
                console.log("item"+newItem);
                newItem.save(function(err, item){
                if(err) {
                    res.json({success:"false",message:"error while adding"});
                } else {
                    console.log(item);
                    res.json({success:"true",message:"item added"});
                }
            });
        }
    })
}
else{
    res.json({success:"false",message:"Request error"});
}

});

router.patch('/:id', function(req, res){
    console.log('patch backend');
    console.log(req.params.id,req.body.price);
    Item.findOneAndUpdate({_id:req.params.id}, {$set:{ price:req.body.price}},function(err, items){
        if(err) {
            res.json({success:"false",message:"error while updating"});
        } else {
            console.log(items);
            res.json({success:"true",message:"item updated"});
        }
    });
});

router.delete('/:id', function(req, res){
    console.log(req.params.id)
    Item.findByIdAndRemove({
        _id: req.params.id
    },function(err, item){
        if(err) {
            res.send('error while deleting');
        } else {
            console.log(item);
            res.json({success:"true",message:"item deleted"});
        }
    });
});

module.exports = router;