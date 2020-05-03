self.addEventListener('message', function (e) {

    for (let i = 0; i < e.data; i++) {
        self.postMessage(i);
    }

}, false);

