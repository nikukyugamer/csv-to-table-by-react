import MyPapa from './my_papa';

let csvFileUri = 'csv/sample.csv';
let obj = new MyPapa();

let csvContentText = obj.readFileFromUrl(csvFileUri);
obj.parseCsv(csvContentText);
