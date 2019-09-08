// MONGOBD PASSWORD:  Vt8yCCJxzt4nsfps
// MONGODB CONNECTION: mongodb+srv://telema:Vt8yCCJxzt4nsfps@cluster0-kxxso.mongodb.net/test?retryWrites=true&w=majority
// mongodb+srv://tams:<password>@cluster0-kxxso.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');

//body-parser is a package that allows us to parse the incoming request and make the body accessible.
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Importing our Recipe 
const Recipe = require('./models/recipe');

// My express app
const app = express();

//Set of middleware enbling us to have access to our api and solve our CORS errors
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

//Connecting to our mongoDB
mongoose.connect('mongodb+srv://tams:piRUm8FRrL3xoaJc@cluster0-kxxso.mongodb.net/test?retryWrites=true&w=majority')
	.then(() => {
		console.log('Successfully Connected to MongoDB Atlas');
	}).catch((error) => {
		console.log('Unable to Connect to MongoDB Atlas');
		console.error(error);
	})


// To convert our parsed body into a json object.
app.use(bodyParser.json());

//POST -  Used to add a new recipe to our list of recipes
app.post('/api/recipes', (req, res, next) => {
	//Creating a new Recipe
	recipe = new Recipe({
		title: req.body.title,
		ingredients: req.body.ingredients,
		instructions: req.body.instructions,
		difficulty: req.body.difficulty,
		time: req.body.time
	});
	recipe.save().then(() => {
		res.status(201).json({
			message: 'Post saved Successfully!'
		})
	}).catch((error) => {
		res.status(400).json({
			error: error
		});
	});
});


// To get a single Object
app.get('/api/recipes/:id', (req, res, next) => {
	// To find one thing
	Thing.findOne({
		_id: req.params.id
	}).then((recipe) => {
		res.status(200).json(recipe);
	}).catch((error) => { 
		res.status(404).json({ error: error });
	});
});


// To update  a recipe
app.put('/api/recipes/:id', (req, res, next) => {
	// Show what you wanna update, you create a new thing
	const recipe = new Recipe({
		_id: req.params._id,
		title: req.body.title,
		ingredients: req.body.ingredients,
		instructions: req.body.instructions,
		difficulty: req.body.difficulty,
		time: req.body.time
	});
	// To update an existing thing
	Thing.updateOne({_id: req.params.id}, recipe).then((recipe) => {
		res.status(201).json({
			message: 'Recipe updated successfully!'
		});
	}).catch((error) => { 
		res.status(400).json({ error: error });
	});
});

// To delete stuffs
app.delete('/api/recipes/:id', (req, res, next) => {
	Thing.deleteOne({ _id: req.params.id }).then(() => {
		res.status(200).json({
			message: 'Deleted!'
		});
	}).catch((error) => {
		res.status(400).json({error: error})
	})
});

//Shape of a Recipe to be shown on our frontend 
app.use('/api/recipes', (req, res, next) => {
	//Recipe.find is used to fine a specific recipe and displays it.
	Recipe.find().then((recipe) => {
		res.status(200).json(recipe);
	}).catch((error) => {
		res.status(400).json({
			error: error
		});
	});
	const recipe = [{
				title:'Jollof Rice',
			ingredients: ['Rice', 'Groundnut oil', 'Smoked Fish',
				'Tomatoes', 'Tin Tomatoes', 'Onions', 'Spices', 'Salt'],
				instructions: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. ',
				difficulty: 30,
				time: 45,
				_id: 'J45',
		}]
		res.status(200).json(recipe);
});

module.exports = app;