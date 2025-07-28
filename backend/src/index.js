const app = require('./app');
// const config = require('./config');
console.log(app)
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});