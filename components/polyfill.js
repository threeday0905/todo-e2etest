(function() {
    function polyfill() {
        var CustomEvent = function(event, params) {
            var evt;
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };

            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent; // expose definition to window
    }

    if (typeof CustomEvent !== 'function') {
        polyfill();
    } else {
        try {
            new CustomEvent('test');
        } catch (e) {
            polyfill();
        }
    }

}());
