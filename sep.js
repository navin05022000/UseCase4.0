const fs = require('fs');

function separateCSVFiles(csvFilePath) {
  // Read the CSV data from the file
  const csvData = fs.readFileSync(csvFilePath, 'utf8');

  const rows = csvData.split('\n');
  
  // Separate the data into individual tables
  const productDetail = rows.slice(0, 6).join('\n');
  const refrigeratorDetail = rows.slice(7, 13).join('\n');
  const specialOffer = rows.slice(14, 20).join('\n');
  const finalPrice = rows.slice(21, 27).join('\n');
  const service = rows.slice(28,34).join('\n');
  const dealer = rows.slice(35, 56).join('\n');

  // Save the data into separate CSV files
  fs.writeFileSync('product_detail.csv', productDetail);
  fs.writeFileSync('refrigerator_detail.csv', refrigeratorDetail);
  fs.writeFileSync('special_offer.csv', specialOffer);
  fs.writeFileSync('final_price.csv', finalPrice);
  fs.writeFileSync('service_sheet.csv',service);
  fs.writeFileSync('dealer_detail.csv', dealer);

  console.log('CSV files saved successfully.');
}

// Example usage: Pass the path to your CSV file
const csvFilePath = 'product_categories.csv';

// Call the function with the CSV file path
separateCSVFiles(csvFilePath);
