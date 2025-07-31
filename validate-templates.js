const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars'); // You might need to install this with npm

// Function to validate a template
function validateHandlebarsTemplate(filePath) {
  try {
    const templateSource = fs.readFileSync(filePath, 'utf8');
    Handlebars.precompile(templateSource);
    console.log(`✓ Valid: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`✗ Error in ${filePath}:`);
    console.error(`  ${error.message}`);
    return false;
  }
}

// Function to find all Handlebars templates in a directory recursively
function findHandlebarsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fileList = findHandlebarsFiles(filePath, fileList);
    } else if (file.endsWith('.hbs')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Validate all Handlebars templates in the templates directory
const templatesDir = path.resolve('./templates');
const templateFiles = findHandlebarsFiles(templatesDir);

console.log(`Found ${templateFiles.length} Handlebars templates.`);

let validCount = 0;
let invalidCount = 0;

templateFiles.forEach(file => {
  if (validateHandlebarsTemplate(file)) {
    validCount++;
  } else {
    invalidCount++;
  }
});

console.log(`\nValidation complete: ${validCount} valid, ${invalidCount} invalid`);
