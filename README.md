banzuke
=======

A Standalone Micro JavaScript Que Worker.

bind an emitter function to banzuke:
```javascript
banzuke.emitter(yobidashi.pub);
```

subscribe banzuke to prefered work event:
```javascript
yobidashi.sub('/workQue', banzuke.pullSub);
```

create a simple worker function that listens for messages, and then emits to the work que, or use a _que manager_:
```javascript
(function(){
    var id;
    yobidashi.sub('/banzuke/messages', function(){
        clearTimeout(id);
        id = setTimeout(function(){
            while(banzuke.hasMessages()){
               yobidashi.pub('/workQue'); 
            }
        });
    },500);
}());
```

using a messaging library, like yobidashi to create subbed functions:
```javascript
//using yobidashi setup some subs
var qued_cb = yobidashi.bind(function(){
    //get the data bound to this function
    var data = new this;
    //i do work here
}, banzuke.message);                         
yobidashi.sub('/responsive', qued_cb);
```

push data to the messaging que where and when you need:
```javascript
banzuke.push({foo:'bar'}, '/responsive');
```

example page using yobidashi: http://jsfiddle.net/toxigenicpoem/Pzk75/


The MIT License (MIT)

Copyright (c) 2013 Derek M. Anderson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.