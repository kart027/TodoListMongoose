const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/TodoDB");


const express = require("express");
const app = express();
const BodyParser = require("body-parser");
app.listen(3000);

app.use(BodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine","ejs");

const TodoSchema =  new mongoose.Schema({
    name:String
});

const Todo = new mongoose.model("Todo",TodoSchema);

const T1 =  new Todo({
    name: "Go to market"
})

const T2 =  new Todo({
    name: "sleep"
})


const T3 =  new Todo({
    name: "Go to bedroom"
})
var Arrays = [T1,T2,T3];

// Todo.insertMany(Arrays,function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("sucess");
//     }

// })



app.get("/",function(req,res){
    
    var today = new Date();
    var options  = {
        weekday: "long",
        day : "numeric",
        month: "long"

    };
    var day = today.toLocaleDateString("en-US",options);


    // if(today.getDay == 6 || today.getDay == 0){
    //     day =  D;
      
    // }else{    
    //     day =D;                                      // here we are creating file for both weekday and end and if we also
    //                                                          //   have to print coresponding days also then we hve to send 7 send file to avoid that we will create ejs templete
    // }
    Todo.find({},function(err,result){

        if(result.length == 0){
          Todo.insertMany(Arrays,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("sucess");
    }
// })
    
    });
}else{
        res.render("list",{KindOfDay : day, NewListitems : result});
    }
})

  
})
app.post("/",function(req,res){

        var item = req.body.num1;
        const T4 = new Todo({
            name:item
        });
        T4.save();
        res.redirect("/");
})

app.post("/delete",function(req,res){
    const checkitem = req.body.checkbox;
    Todo.findByIdAndRemove(checkitem,function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Sucesss");
        }
        res.redirect("/");
    })

})