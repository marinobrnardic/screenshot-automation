PDFDocument = require('pdfkit');
fs = require('fs');
sizeOf = require('image-size');
const { dirFilestage } = require('./website-config.js');

var snapshotFolderFilestage = fs.readdirSync(dirFilestage);
docFilestage = new PDFDocument({autoFirstPage: false});
docFilestage.pipe(fs.createWriteStream('snapshots-filestage.pdf'));

for(var i=0; i < snapshotFolderFilestage.length; i++){

  var imageFilestage = dirFilestage + '/' + snapshotFolderFilestage[i];
  var dimensions = sizeOf(imageFilestage);

  docFilestage.addPage({
    size: [dimensions.width, dimensions.height],
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  });
  
  docFilestage.image(imageFilestage);

}

docFilestage.end();