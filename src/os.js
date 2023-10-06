var Empire = require('empire');
var Kernel = require('kernel');

var os = {
    run: function() {
        console.log("os.run()");
        empire.run();
        kernel.run();

    }
}
module.exports = os;