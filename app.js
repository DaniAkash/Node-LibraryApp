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

/**
 * Specifiying Routers
 */
var bookRouter = express.Router();
var authorRouter = express.Router();

/**
 * Navigation bar in the website
 */
var nav = [
    {link: '/Authors', text: 'Authors'},
    {link: '/Books', text: 'Books'}
];

/**
 * Dummy Data - will be deleted when Database integration is done...
 */
var books = [
    {
        name: 'A Little Life',
        author: 'Hanya Yanagihara',
        image: 'http://t3.gstatic.com/images?q=tbn:ANd9GcTE0X3r_-93u35m88WGbVNN6Pyrf_witVy36yHWuZQpe77sWFyW'
    },
    {
        name: 'Fates and Furies',
        author: 'Lauren Groff',
        image: 'http://t0.gstatic.com/images?q=tbn:ANd9GcTQ7100T0UGX52szQGU4Nx3dY1Wu4uWBsz2Pmr8NVr1j6xa8EyE'
    },
    {
        name: 'The Girl on the Train',
        author: 'Paula Hawkins',
        image: 'http://t0.gstatic.com/images?q=tbn:ANd9GcT-ACZX5Ej0uOo7Qglqf-q_PYan0_uNSSsG2UDn-zJgVpDCqx-r'
    },
    {
        name: 'Purity',
        author: 'Jonathan Franzen',
        image: 'http://t0.gstatic.com/images?q=tbn:ANd9GcQDeEN2DGFT0M8PM-p6_Cob1IpXc6mxKan1erV3-wc8WUcPWq2k'
    },
    {
        name: 'Go Set a Watchman',
        author: 'Harper Lee',
        image: 'http://t1.gstatic.com/images?q=tbn:ANd9GcSmNGmse2TePp9ybkrbyKW3BkdWoe1DW_s0hfNLKWThhjlCGtPu'
    },
    {
        name: 'The Buried Giant',
        author: 'Kazuo Ishiguro',
        image: 'http://t2.gstatic.com/images?q=tbn:ANd9GcQL_u5u9SBo1qjasx3cWVoATF0pVYbvLmED3vAFL9mNmUuAyven'
    }
];

bookRouter.route('/')
    .get(function(req, res) {
        res.render('books', {title: 'Library - Books', books: books, nav: nav});
    });

bookRouter.route('/single')
    .get(function(req, res) {
        res.send('A single book!');
    });

authorRouter.route('/')
    .get(function(req, res) {
        res.render('books', {title: 'Library - Authors', nav: nav});
    });

app.get('/', function(req, res) {
    res.render('index', {title: 'Library', nav: nav});
});

app.use('/Books', bookRouter);
app.use('/Authors', authorRouter);

app.listen(port, function(err) {
    if (!err) {
        console.log('Express server started on port: ' + port);
    } else {
        console.log('Unable to Start Express Server!! ERROR: ' + err);
    }
});
