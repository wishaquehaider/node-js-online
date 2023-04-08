let myExpress = require('express')
let myApp = myExpress();
myApp.use(myExpress.json());
let multer = require('multer');
let tokenWali = require("jsonwebtoken")
let fs = require('fs');
const path = require('path');
let users = []
let products = [];

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         let path = './servire/uplode-file/'+req.body.name;
//       let userParraHua = fs.existsSync(path);
//       if(userParraHua==false){
//           fs.mkdir(path,function(){
//             cb(null,path)
//          })
//       }else{
//         cb({message:'User already exists'},null)
//       }
      
//     },
//     filename: function (req, file, cb) {
        
//       cb(null, file.originalname)  
//     }
//   })

//   const upload = multer({ storage: storage })






//   const storage_2 = multer.diskStorage({
//     destination: function (req, file, cb) {
    
//         cb(null,'./servire/uplode-file')
      
//     },
//     filename: function (req, file, cb) {
        
//       cb(null, file.originalname)  
//     }
//   })

//   const upload_2 = multer({ storage: storage_2 })


myApp.get('/user_creat',function(req,resp){  
    resp.json(users)
})
    
    
myApp.get('/user_lao',function(req,resp){
   let userMilgya = users.find(user=>user.id == req.query.id)
   resp.json(userMilgya)
})


myApp.put('/user_update',function(req,resp){
   let indexFind = users.findIndex(user=>user.id==req.body.id);
   
   users[indexFind] = req.body 
})



myApp.post('/login_data',function(req,resp){
   let userMillGya = users.find(user=> user.email==req.body.email && user.password==req.body.password)
     console.log(userMillGya);
   if(userMillGya){
    tokenWali.sign({uderId:userMillGya.id},'Blue Barry',{expiresIn:'2d'},function(err,meraToken){
        resp.json({
            userMillGya,
            meraToken
        })
    })
   }

})
 myApp.post('/session_check',function(req,resp){
    tokenWali.verify(req.body.token,'Blue Barry',function(err,dataObj){
        if(dataObj){
            let user = users.find(user=> user.id == dataObj.uderId)
            console.log(user);
            resp.json(user)
        }
    })
})



myApp.get('/all_product',function(req,resp){
    resp.json(products)
})


myApp.get('/personal_cards',function(req,resp){
    let personal_data = products.filter(product=> product.id==req.query.anc)
    resp.json(personal_data)
})


// myApp.post('/user_add',upload.single('pic'),function(req,resp){
//     req.body.pic = req.body.name+ '/'+ req.file.originalname
//     users.push(req.body)
//     console.log(req.body);
//     resp.end('user add ho gya')
// })

myApp.post('/user_add',function(req,resp){
  users.push(req.body)
  console.log(req.body);
  resp.end('user add ho gya')
})


// myApp.post('/create_product',upload_2.single('pic'),function(req,resp){
//     req.body.pic = req.file.originalname
//     products.push(req.body)
//     resp.end('product addd hoo gaye')
// })



myApp.use(myExpress.static('./build'));
// myApp.use(myExpress.static('./servire/uplode-file'));

myApp.use(function(err,req,resp,cb){
    resp.status(500).json(err)
});


myApp.listen(3003,function(){
    console.log('servire challing');
})