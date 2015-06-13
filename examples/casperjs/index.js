'use strict';

casper.test.begin('Hello, Test!', function(test) {
    casper.start('http://127.1:4002/index.html', function() {
        test.assertExists('todo-input');
        test.assertExists('todo-list');
        this.on('page.error', function(msg) {
            console.error(msg);
        });
    });

    casper.wait(1000, function() {
        this.sendKeys('todo-input input', 'foo');
        this.click('todo-input .btn');
    });

    casper.waitForText('foo', function() {
        test.assertElementCount('li', 1);
        test.assertSelectorHasText('li:first-child', 'foo');
    });

    casper.then(function() {
        this.sendKeys('todo-input input', 'bar', { keepFocus: true } );
        this.sendKeys('todo-input input',
            casper.page.event.key.Enter , { keepFocus: true }
        );
    });

    casper.waitForText('bar', function() {
        test.assertElementCount('li', 2);
        test.assertSelectorHasText('li:last-child', 'bar');
    });

    casper.then(function() {
        test.assertEvalEquals(function() {
            return document.querySelector('todo-input input').value;
        }, '');
    });

    casper.run(function() {
        test.done();
    });
});
