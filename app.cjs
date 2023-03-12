const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require("./db/dbConnect.cjs");
const User = require("./db/userModel.cjs");
const Rating = require("./db/ratingsModel.cjs");
const Articals = require("./db/articalModel.cjs");
var cors = require("cors"); 

console.log(process.env.DB_URL);
dbConnect();



app.use(cors());
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});


// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.json({
        "hello":"hi"
    });
})
app.get("/getarticals", async (request, res)=>{
    try {
        const result = await Articals.find();
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
} )

app.post("/ratings", (request, response) => {
    const rater = new Rating({
        email: request.body.email,
        rating: request.body.rating
    });
    rater
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
            response.status(201).send({
                message: "User rated Successfully",
                result,
            });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
            response.status(500).send({
                message: "Already rated",
                error,
            });
        });

});

app.post("/createart", (request, response) => {
    const artical = new Articals({
        articalType: request.body.articalType,
        creatorName: request.body.creatorName,
        date: request.body.date,
        title: request.body.title,
        content: request.body.content,
        tag1: request.body.tag1,
        tag2: request.body.tag2,
        imgUrl:request.body.imgUrl

    });
    artical
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
            response.status(201).send({
                message: "artical added  Successfully",
                result,
            });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
            response.status(500).send({
                message: "something went wrong",
                error,
            });
        });

});


// register endpoint
app.post("/register", (request, response) => {
    const user = new User({
        email: request.body.email,
        password: request.body.password,
        username: request.body.username
    });
    user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
            response.status(201).send({
                message: "User Created Successfully",
                result,
            });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
            response.status(500).send({
                message: "Error creating user",
                error,
            });
        });

});


// login endpoint
app.post("/login", (request, response) => {
    //const email = request.body.email
   // const password = request.body.password
        
    User.findOne({email:request.body.email})
    .then((foundUser)=>{
        if(foundUser){
            if(foundUser.password === request.body.password){
                response.status(200).send({
                    message: "Login Successful",
                    email: foundUser.email,
                    username:foundUser.username
                    
                });
            }
            else{
                response.status(400).send({
                    message: "Passwords does not match",
                });
                
            }

        }
        else{
            response.status(404).send({
                message: "Email not found",
              });
        }
    })
});

// delete an artical
app.delete('/deleteartical/:id',(req,res)=>{
    Articals.findByIdAndRemove({_id:req.params.id}).then((result) => {
        res.send(result)
        });
    })

app.listen(5000, () => {
    console.log('Server started on port 5000');
});

/*




// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
});




User.findOne({ email: request.body.email },(err, user)=>{
        if(err){
            response.status(404).send({
                message: "Email not found",
                err,
              });
        }
        else if (request.body.password === user.password) {
            const token = jwt.sign(
                {
                    userId: user._id,
                    userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
            );
            response.status(200).send({
                message: "Login Successful",
                email: user.email,
                token,
            });
        }
        else {
            response.status(400).send({
                message: "Passwords does not match",

            });
        }
    })
*/ 
/////////////////////////////////////////////////////////




