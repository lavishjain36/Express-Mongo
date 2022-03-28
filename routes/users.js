var express = require('express');
var router = express.Router();
var {mongodb, MongoClient, dbUrl} = require('../dbSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
});


router.get('/all',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl);
try{
  const db=await client.db("B31wd");
  let users=await db.collection("users").find().toArray();
  res.json({
    statusCode:200,
    users:users
  })
}
  catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal server error"
    })
  }
  finally{
    client.close();

  }

})


router.post('/signup',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl);

  try {
    const db=await client.db('B31wd');
    let user=await db.collection('users').find({email:req.body.email}).toArray();
    if(user.length>0){
      res.json({
      statusCode:400,
      message:"User already exists"
      })

    }else{
      let document=await db.collection('users').insertOne(req.body);
      res.json({
        statusCode:201,
        message:"Signup successfully",
        data:document
      })

    }


  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal server error"
    })
  }
  finally{
    client.close();

  }

})



router.post('/logins',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl);

  try {
    const db=await client.db('B31wd');
    let user=await db.collection('users').find({email:req.body.email}).toArray();
    if(user.length>0)
    {
      let user=await db.collection('users').findOne({email:req.body.email});
      if(user.password==req.body.password)
      {
        
          res.json({
            statusCode:200,
            message:"Login successfully",
            data:user
          })

      }
      else
      {
          res.json({
            statusCode:400,
            message:"Invalid Credential"
          })
      }
      
    }
    else{
      res.json({
        statusCode:404,
        message:"User Not Found", 
      })

    }


  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal server error"
    })
  }
  finally{
    client.close();

  }

})

module.exports = router;
