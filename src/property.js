'use strict';

function Property(propertyDetails) {

  this.invalidDetails = function() {
    if(!propertyDetails || !propertyDetails.name ||
    !propertyDetails.description || !propertyDetails.price) return true;
  };

  if(this.invalidDetails()) throw new Error("A property must have a name,\
 description and a price per night.");

}

 module.exports = Property;

