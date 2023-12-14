const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const localFilePath = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.error ('Failed to download page due to an error', error);
  process.exit(1);
  } else if (response.statusCode !== 200) {
    console.error(`Failed to download page: Server responded with status code ${response.statusCode}`);
    process.exit(1);
  } else {
    fs.writeFile(localFilePath, body, (err) => {
      if (err) {
        console.error('failed to write file', err);
        process.exit(1);
      } else {
        const fileSize = Buffer.byteLength(body,'utf8');
        console.log(`Downloaded and saved ${fileSize} bytes to ${localFilePath}`);
      }
    }) 
  } 
});