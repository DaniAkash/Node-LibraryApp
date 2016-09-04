var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

/**
 * Serve the static files
 */
app.use(express.static('public'));

/**
 * Define Views folder and templating engine
 */
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    var nav = [
        {link: '/Authors', text: 'Authors'},
        {link: '/Books', text: 'Books'}
    ];
    res.render('index', {nav: nav});
});

app.listen(port, function(err) {
    if (!err) {
        console.log('Express server started on port: ' + port);
    } else {
        console.log('Unable to Start Express Server!! ERROR: ' + err);
    }
});
