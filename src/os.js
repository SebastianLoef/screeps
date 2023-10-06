var Empire = require('empire');
var Kernel = require('os.kernel');

var os = {
    run: function() {
        console.log("os.run()");
        Empire.run();
        Kernel.run();

    }
}
module.exports = os;