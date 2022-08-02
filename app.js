//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const date = require(__dirname + '/date.js');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/view'))

const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItem = [];

app.get('/', (req, res) => {
    const day = date.getDate();

    res.render('lists', {
        ListTitle: day,
        newListItems: items
    });
});

app.post('/', (req, res) => {
    const { newItem:item, listTitle} = req.body

    if (listTitle === 'work') {
        workItem.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
   
});

app.get('/work', (req, res) => {
   res.render('lists', {
    ListTitle: 'work list',
    newListItems: workItem
   });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server is spinnig at port 3000');
});