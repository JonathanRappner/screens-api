const app = require("./index")
const port = 3000

app.listen(port, (error) => {
	if(error) throw error
	console.log('Server running on port '+ port)
});