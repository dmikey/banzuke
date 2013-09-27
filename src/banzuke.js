var banzuke = (function () {
    'use strict';
    var stacks = {};
    var _message = "";
    var _haveMessages = true;
    var _emitter;
    var _ = {
        push: function (message, key) {
            var stack = stacks[key];
            if (!stack) {
                stacks[key] = [];
            }
            stacks[key].push(message);
            _haveMessages = true;
            _emitter("/banzuke/messages");
        },
        pull: function () {
            var _lastmessage;
            for(var val in stacks){
                if (val !== undefined) {
                    _message = stacks[val].shift();
                    if(_message !== undefined){
                        _emitter(val);
                    }
                    _lastmessage = _message;
                }
            }
            if(!_lastmessage){
                _haveMessages = false;
            }
        },
        pullSub: function () {
            //currently tied to yobidashi
            _.pull();
        },
        message: function () {
            return _message;
        },
        hasMessages: function () {
            return _haveMessages;
        },
        emitter: function(em){
            _emitter = em; 
        }
    };
    return _;
}());