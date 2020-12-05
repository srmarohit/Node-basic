const fs = require('fs');

var bufData = fs.readFileSync('info.json');
var stringData = bufData.toString();
var jsonData = JSON.parse(stringData);

jsonData.name = "Rajat";
jsonData.college = "SSIPMT";

const data = JSON.stringify(jsonData);
fs.writeFileSync('info.json', data);