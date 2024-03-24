// Enable all CORS requests
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

// Run backend on local port 8000
const PORT = process.env.PORT || 8000;

// MeiliSearch API
import { MeiliSearch } from 'meilisearch';
const search_client = new MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: 'masterkeyforminoritybusiness'
})

// MySQL connection
import mysql from 'mysql';
const con = mysql.createConnection({
    host: "minoritybusiness.c76siigws906.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "tuchus-xuknyS-2gyhna",
    database: "main",
    port: "3306"
});

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post('/addproduct', (req, res) => {

    if (req.query.ProductID && req.query.Name && req.query.Price && req.query.Description && req.query.URL) {
        console.log('Request received');
        con.connect(function(err) {
            con.query(`INSERT INTO main.Products (ProductID, Name, Price, Description, URL) VALUES ('${req.query.ProductID}', '${req.query.Name}', '${req.query.Price}', '${req.query.Description}', '${req.query.URL}')`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({ProductID: req.query.ProductID, Name: req.query.Name, Price: req.query.Price, Description: req.query.Description, URL: req.query.URL});
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
})

app.post('/deleteproduct', (req, res) => {
    if (req.query.Name) {
        console.log('Request received');
        con.connect(function(err) {
            con.query(`DELETE FROM main.Products WHERE ProductID='${req.query.ProductID}'`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({ProductID: req.query.ProductID});
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
})

app.get('/products', (req, res) => {
    con.connect(function(err) {
        con.query(`SELECT * FROM main.Products`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.json({ result: result });;
        });
    });
});

app.get('/search/products/:product_name', (req, res) => {
    // http://localhost:8000/search/products/
    search_client.index('ProductID').updateFilterableAttributes([
        'Name',
        'Description'
    ])
    search_client.index('ProductID').updateSortableAttributes([
        'Name',
        'Price'
    ])
    search_client.getIndex('ProductID');

    search_client.getTask(0);
    const search_tag = req.params.product_name;

    search_client.index('ProductID').search(search_tag, {
        limit: 5,
        sort: ['Price:asc'],
    }).then((r) => {
        res.send(r.hits);
    });
})

app.get('/product/:product_id', (req, res) => {
    con.connect(function(err) {
        con.query(`SELECT * FROM main.Products WHERE ProductID = ` + req.params.product_id + `;`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) console.log(result);res.json({ name: result[0].Name, price: result[0].Price, description: result[0].Description, url: result[0].URL});
        });
    });
})

app.post('/product', (req, res) => {
    if (req.body.name && req.body.price && req.body.url && req.body.description) {
        console.log('Request received');
        if(req.body.id){
            var sql = `UPDATE Products SET Name = '${req.body.name}', Price = '${parseFloat(req.body.price)}', Description = '${req.body.description}',URL = '${req.body.url}' WHERE ProductID =${req.body.id}`;
        } else {
            var sql = `INSERT INTO Products (Name, Price, Description, URL) VALUES ('${req.body.name}', '${parseFloat(req.body.price)}', '${req.body.description}', '${req.body.url}')`;
        }
        con.query(sql, function (err, result) {
            if (err) res.send(err);
            if (result) res.send(req.body);
            console.log("1 product recorded");
        });
    } else {
        console.log('Missing a parameter');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });