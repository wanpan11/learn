function foo () { console.log(111); }
function bar () { return foo(); }
function baz () { return bar(); }

baz();