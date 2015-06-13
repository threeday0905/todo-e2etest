'use strict';

var page = require('webpage').create();

page.onConsoleMessage = console.log;

page.onError = function (msg, trace) {
    console.log('==error=============');
    console.log(msg);
    console.log(trace);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
};

page.open('http://127.1:4002/index.html', function() {
    setTimeout(function() {

        page.evaluate(function() {
            document.querySelector('todo-input input').value = 'bar';
            document.querySelector('todo-input .btn').click();
        });

        setTimeout(function() {
            var html = page.evaluate(function() {
                return document.body.innerHTML;
            });

            console.log(html);
        }, 2000);

    }, 1000);
});
