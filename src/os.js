var Empire = require('empire');
var Kernel = require('os.kernel');

var os = {
    run: function() {
        console.log("os.run()");
        empire.run();
        kernel.run();

    }
}
module.exports = os;