// Flag to ensure helpers are only registered once
let helpersRegistered = false;

/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  // Only register helpers once
  if (!helpersRegistered) {
    registerHandlebarsHelpers();
    helpersRegistered = true;
  }

  return foundry.applications.handlebars.loadTemplates([
    // Actor partials.
    'systems/myriad-system/templates/actor/parts/actor-features.hbs',
    'systems/myriad-system/templates/actor/parts/actor-items.hbs',
    'systems/myriad-system/templates/actor/parts/actor-spells.hbs',
    'systems/myriad-system/templates/actor/parts/actor-effects.hbs',
    // Item partials
    'systems/myriad-system/templates/item/parts/item-effects.hbs',
  ]);
};

/**
 * Register Handlebars helpers for the system
 */
function registerHandlebarsHelpers() {
  // Helper for generating "times" loops, useful for star ratings/circles
  Handlebars.registerHelper('times', function(n, options) {
    let result = '';
    for (let i = 1; i <= n; i++) {
      result += options.fn(i);
    }
    return result;
  });
  
  // Helper for less than or equal comparison
  Handlebars.registerHelper('lte', function(a, b) {
    // Handle undefined/null values
    if (a === undefined || a === null) a = 0;
    if (b === undefined || b === null) b = 0;
    
    // Convert to numbers if possible
    const numA = Number(a);
    const numB = Number(b);
    
    // If both values can be converted to numbers, compare them numerically
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA <= numB;
    }
    
    // Otherwise, do a string comparison
    return String(a) <= String(b);
  });
  
  // Helper for getting total characteristic value
  Handlebars.registerHelper('characteristicTotal', function(characteristic) {
    // Return 0 if characteristic is undefined or null
    if (!characteristic) return 0;
    
    // Get values with fallbacks to 0
    const value = characteristic.value ? Number(characteristic.value) || 0 : 0;
    const bonus = characteristic.bonus ? Number(characteristic.bonus) || 0 : 0;
    const malus = characteristic.malus ? Number(characteristic.malus) || 0 : 0;
    
    return value + bonus - malus;
  });
  
  // Helper for concatenating strings
  Handlebars.registerHelper('concat', function() {
    let result = '';
    for (let i = 0; i < arguments.length - 1; i++) {
      result += arguments[i];
    }
    return result;
  });
  
  // Helper for converting values to numbers
  Handlebars.registerHelper('toNumber', function(value) {
    if (value === undefined || value === null) return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  });
  
  // Helper for comparing two values for equality
  Handlebars.registerHelper('ifequal', function(v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  // Helper for equality check in if statements
  Handlebars.registerHelper('eq', function(v1, v2) {
    return v1 === v2;
  });
  
  // Helper pour concaténer des strings
  Handlebars.registerHelper('concat', function() {
    let result = '';
    for (let i = 0; i < arguments.length - 1; i++) {
      result += arguments[i];
    }
    return result;
  });
  
  // Helper pour convertir un nombre en chiffre romain
  Handlebars.registerHelper('numberToRoman', function(num) {
    const romanNumerals = {
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V'
    };
    return romanNumerals[num] || num;
  });
}
