var builder = require('flipper/toolkit/builder'),
    fs = require('fs');

var result = builder.compile({
    base: __dirname,
    files: [
        './components/todo-input.html',
        './components/todo-list.html'
    ]
});

var output = __dirname + '/components';

fs.writeFileSync(output + '/compiled.js',  result.script);
fs.writeFileSync(output + '/compiled.css', result.style);
