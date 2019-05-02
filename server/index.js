const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session'); // -> session storage using mongo
const path = require('path');

const User = require('./schemas/users');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/angulardb', {useFindAndModify: false}).then(
	function(_mongoose){
		console.log(`mongoose is up`);
	});

app.use(session({ secret: 'zz', resave: false, saveUninitialized: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../frontend/dist/'))) // BUT ON PRODUCTION -> nginx

app.post('/api/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email, password });
	
	if(user) {
		req.session.user = user;
		res.json({ status: 'ok' })
	} else {
		res.json({ status: 'error', data: `Email is ${email} and password is ${password}. Email or password is wrong.` })
	}
})

app.post('/api/isloggedin', (req, res) => {
	res.json({ status: req.session.user ? true : false })
})

app.post('/api/register', async (req, res) => {
	const { email, password } = req.body;
	// validate if email already exists
	const exists = await User.findOne({ email }) ? true : false;
	if (exists) { 
		res.json({status: 'error', data: `${email} is existed.`});
	}

	let user = new User({email, password});
	user = await user.save()
	if (user){
		req.session.user = user;
		res.json({status: 'ok', data: user});
	} else {
		res.json({status: 'error', data: 'cant save this user.'});
	}
})

app.post('/api/logout', (req, res) => {
	req.session.destroy(_ => {
		res.json({ status: 'ok' })
	})
})

app.post('/api/data', async (req, res) => {
	const user = await User.findOne({email: req.session.user.email});
	let status = 'error';
	if (user) {
		status = 'ok';
	};
	res.json({
		status,
		user
	});
})

app.post('/api/updatequote', async (req, res) => {
	if (req.session.user) {
		req.session.user.quote = req.body.quote;
		User.findByIdAndUpdate(req.session.user._id, req.session.user, {}, (err, doc, res_) => {
			if (err) {
				res.json({ status: 'error' });
			} else {
				res.json({ status: 'ok' });
			}
		})
	}
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
})

app.listen(1234, _ => console.log('Up'));
