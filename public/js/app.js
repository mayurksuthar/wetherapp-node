// fetch('https://puzzle.mead.io/puzzle').then((res) =>{
// 	res.json().then((data) => {
// 		console.log(data)
// 	})
// })
function locfind(add) {
	fetch('http://localhost:3000/wether?address='+ add).then((res) => {
	res.json().then((data) => {
		if(data.error){
			console.log(data.error);
		}else{
			// console.log(data);
			return data.fullname;
		}
	})
})
}


const wetherform = document.querySelector('form')
const serchval = document.querySelector('input')
const msg = document.querySelector('#msg')

msg.textContent = "test"

wetherform.addEventListener('submit', (e) => {
	e.preventDefault()
	const loc = serchval.value
	if (loc.length>0) {
		// let val = locfind(loc);
		// console.log(val);
		msg.textContent = 'loading'
		fetch('http://localhost:3000/wether?address='+ loc).then((res) => {
			res.json().then((data) => {
				if(data.error){
					msg.textContent = data.error
					console.log(data.error);
				}else{
					msg.textContent = data.fullname
					// console.log(data);
					console.log(data.fullname);
				}
			})
		})
	}
	else{
		console.log('error');
	}
	
})