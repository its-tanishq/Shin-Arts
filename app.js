import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import nodemailer from "nodemailer";
import multer from "multer";

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });

env.config();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
  }));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PWD,
    port: process.env.PG_PORT,
});

db.connect();

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/index", (req, res) => {
    res.render("index.ejs");
});

app.get("/work", (req, res) => {
    res.render("work.ejs");
});

app.get("/work/conceptart", (req,res) => {
    res.render("conceptart.ejs");
});

app.get("/work/digital", (req,res) => {
    res.render("digital.ejs");
});

app.get('/work/animated', (req, res) => {
  res.render('animated.ejs');
});

app.get("/work/sketchbook", (req,res) => {
    res.render("sketchbook.ejs");
});

app.get("/work/traditional", (req,res) => {
    res.render("traditional.ejs");
});

app.get('/work/canvas', (req, res) => {
  res.render('canvas.ejs');
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post("/subscribe", async (req, res) => {
    console.log(req.body);
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    try {
        const checkUser = await db.query("SELECT * FROM testsubscribers where email = $1", [email]);
        if (checkUser.rows.length > 0) {
            // User is already registered
            req.session.popUpDetails = {
                popUpClass: 'active',
                popUpIcon: 'fa-regular fa-circle-xmark',
                popUpIconClass: 'icon-checkmark',
                popUpTitle: 'Already Subscribed',
                popUpTitleClass: 'popup-title-red',
                popUpMessage: 'You have already subscribed! Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                popUpBtnClass: 'popup-btn-red'
            };
        } else {
            // New user registered
            await db.query("INSERT INTO testsubscribers (first_name, last_name, email) VALUES ($1, $2, $3)", [fName, lName, email]);
            req.session.popUpDetails = {
                popUpClass: 'active',
                popUpIcon: 'fa-regular fa-circle-check',
                popUpIconClass: 'icon-tickmark',
                popUpTitle: 'Successfully Subscribed',
                popUpTitleClass: 'popup-title-green',
                popUpMessage: 'Thank you for subscribing Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                popUpBtnClass: 'popup-btn-green'
            };
        }
        res.redirect("/subscribe/status");
    } catch (err) {
        console.error('Error inserting subscriber into database:', err);
        res.status(500).send("Internal server error");
    }  
});

app.get("/subscribe/status", (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    if (req.session.popUpDetails) {
        // Render the popup with the details from the session
        res.render('subscribepopup.ejs', req.session.popUpDetails);

        // Clear the popup details from the session
        delete req.session.popUpDetails;
    } else {
        // Redirect to the subscription form or home page if no popup details are found
        res.redirect("/about");
    }
})

app.get("/contact", (req, res) => {
    res.render('contact.ejs');
});

app.post("/contact/message", upload.single('attachment'), (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const message = req.body.message;
    const attachment = req.file;

    console.log("FName: ", fName , "LName: ", lName, "Email: ", email);

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Construct the email message
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        subject: 'Contact Form Message',
        text: `Message from ${fName} ${lName}\nContact-Info: ${email}\n\n${message}`,
        attachments: attachment ? [
            {
                filename: attachment.originalname,
                path: attachment.path
            }
        ] : []
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        let popUpClass, popUpIcon, popUpTitle, popUpMessage;
        if (error) {
            popUpClass = 'popup-error';
            popUpIcon = 'fas fa-times-circle'; 
            popUpTitle = 'Error Sending Message';
            popUpMessage = 'Error sending email: ' + error.message;
            console.error('Error sending email: ', error.message);
        } else {
            popUpClass = 'popup-success';
            popUpIcon = 'fas fa-check-circle';
            popUpTitle = 'Message sent successfully';
            popUpMessage = 'I will reach back to you in a short while! Thank you for contacting me!';
            console.log('Email sent: ' + info.response);
        }
    
        if (attachment) {
            fs.unlink(path.join(__dirname, attachment.path), (err) => {
                if (err) {
                    console.error('Error deleting attachment file: ', err);
                }
            });
        }

        req.session.popUpDetails = {
            popUpClass: popUpClass,
            popUpIcon: popUpIcon,
            popUpTitle: popUpTitle,
            popUpMessage: popUpMessage
        };

        res.redirect("/contact/message/sent");
    });
});

app.get("/contact/message/sent", (req, res) => {
    console.log("Reached /contact/message/sent route");
    console.log("Session Data:", req.session.popUpDetails);
    // Check if session has popup details
    if (req.session.popUpDetails) {
        // Render the popup with the details from the session
        res.render('contactpopup.ejs', {
            popUpClass: req.session.popUpDetails.popUpClass,
            popUpIcon: req.session.popUpDetails.popUpIcon,
            popUpTitle: req.session.popUpDetails.popUpTitle,
            popUpMessage: req.session.popUpDetails.popUpMessage
        });

        // Clear the popup details from the session
        delete req.session.popUpDetails;
    } else {
        // Redirect to the contact form or home page if no popup details are found
        res.redirect("/contact");
    }
});

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});