const express = require('express');
const cors = require("cors");
require('./db/config');

const users = require('./db/user');
const Product = require('./db/product');

const Jwt = require('jsonwebtoken');
const { Verify } = require('crypto');

//try
const path=require('path');



const jwtKey = 'e-comm';

const app = express();

app.use(express.json());
app.use(cors());

//static files
app.use(express.static(path.join(__dirname,'../frontend/build')))



app.post('/register', async (req, resp) => {
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    // resp.send(result);
    Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            resp.send("Something ERROR please LOGIN Again!")
        }
        resp.send({ result, auth: token })
    })

})

app.post('/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await users.findOne(req.body).select("-password");
        // let result=await user.save();

        if (user) {
            // resp.send(user);
            Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    resp.send("Something ERROR please LOGIN Again!")
                }
                resp.send({ user, auth: token })
            })

        } else {
            resp.send("No User Found");
        }

    } else {
        resp.send("No User Found");
    }
})

app.post('/add-product',verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get('/products',verifyToken, async (req, resp) => {
    let product = await Product.find();
    if (product.length > 0) {
        resp.send(product)
    }
    else {
        resp.send({ result: "No Product Found" });
    }
})


app.delete('/product/:id',verifyToken, async (req, resp) => {

    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);

})

app.get('/product/:id',verifyToken, async (req, resp) => {

    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    }

})


app.put('/product/:id',verifyToken, async (req, resp) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });

    resp.send(result)
});

app.get('/search/:key',verifyToken,async (req, resp) => {
    let result = await Product.find({
        "$or": [

            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },

        ]
    })
    // result=await result.json();
    resp.send(result);

})

function verifyToken(req,resp,next){
    let token=req.headers['authorization']
    token=token.split(' ')[1];
    // console.log(token)
    if(token)
    {
    Jwt.verify(token,jwtKey,(err,valid)=>{
        if(err)
        {
            resp.status(401).send({result:"Please Provide Valid Token!"})
        }else{
            next();
        }

    })
    }else{
        resp.status(403).send({result:"Please Add Token! With Header"})
    }
    // console.log(token);
}

//try
app.get('*',function(req,resp){
    resp.sendFile(path.join(__dirname,'../frontend/build/index.html'))
});


app.listen(3000);