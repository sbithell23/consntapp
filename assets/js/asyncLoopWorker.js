var i =1;
self.addEventListener('message', function (e) {
    console.log("iii " ,i);
    self.postMessage(self.i++);

    // asyncLoop(e.data, function (loop) {
    //     var i = loop.iteration();
    //     if (e.data == 'next') {
           
    //     }
    // }, function () {

    // })

}, false);

function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function () {
            if (done) {
                return;
            }
            if (index < iterations) {
                index++;
                func(loop);
            } else {
                done = true;
                if (callback) { callback("finish"); }
            }
        },
        iteration: function () {
            return index - 1;
        },
        break: function () {
            done = true;
            if (callback) { callback("break"); }
        }
    };
    loop.next();
    return loop;
}