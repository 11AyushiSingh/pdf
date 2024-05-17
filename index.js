const express = require('express');
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const fs = require('fs');

const app = express();
const port = 3000;


app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    try {
       
        const data = {
            accountNumber: "123456789",
            status: "Active",
            name: "John Doe",
            companyName: "Acme Corp",
            currency: "USD",
            activationDate: "2021-01-01",
            records: [
                { name: "Alice", age: 30, city: "New York" },
                { name: "Bob", age: 25, city: "Los Angeles" },
                { name: "Charlie", age: 35, city: "Chicago" }
            ]
        };

      
        const html = await ejs.renderFile('template.ejs', data);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html);
        const pdfBuffer = await page.pdf();

       
        await browser.close();

      
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error generating PDF');
    }
});

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
