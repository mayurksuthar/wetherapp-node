const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

console.log(__dirname);
console.log(__filename);
//to get to the public foulder
console.log(path.join(__dirname, '../public'));


const app = express()

// define paths for express config
const publicdir= path.join(__dirname, '../public');
	//change path from views to temples 
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials');


//setup handelbars engine and views
app.set('view engine','hbs') //hendelbar setup
app.set('views',viewspath) //to change view directory to template
hbs.registerPartials(partialsPath) //set up for nav and footer

//setup static directory to server/public folder
app.use(express.static(publicdir))

// app.get('', (req, res) => {
// 	res.send('<h1>home paeg</h1>');
// })

app.get('', (req, res) => {
	res.render('index',{
		title : 'my title',
		name : 'mk',
		namex: 'footer home'
	});
})
app.get('/about', (req, res) => {
	res.render('about',{
		title : 'about title',
		name : 'page',
		namex: 'footer about'
	});
})

app.get('/help', (req, res) => {
	res.send({
		name:'mk',
		age:30
	});
})

app.get('/wether', (req,res) =>{

	if (!req.query.address) {
		return res.send({
			error: 'you must address'
		})
	}

	geocode(req.query.address, (error, {lat,long, fullname} = {}) => {
			if(error){
				return console.log('Error' , error)
			}	
				 // console.log('Data', fullname)
				forcast(lat,long, (error, data) => {
					if(error){
						return	console.log('forcast Error' , error)
					}
						// console.log('forcast Data', data)	
						res.send({
							fullname: fullname,
							forcastData:data,
						});	
				 })	
			
			
		})
	
})

app.get('/prod', (req,res) =>{
	// req.query "this use to get url"

	if (!req.query.search) {
		return res.send({
			error: 'you must search'
		})
	}

	res.send({
		prod:[]
	
	});
})

//404 page need to add at last so can work on 404
app.get('/help/*', (req,res) =>{
	res.send('help single not found');
})

app.get('*',(req,res) =>{
	res.render('404',{
		title : 'no data found',
	});
})

app.listen(3000, () => {
	console.log('sercer is up');
});