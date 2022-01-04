function aaa(params) {
    let oo = 99
    bbb(1)
    function fff(params) {
        console.log(oo);
    }
    fff()
}

function bbb(params) {
    ccc(2)
}

function ccc(params) {
    dddd(3)
}

function dddd(params) {
    console.log(1);
}

debugger

var wanpan = 'wan'

aaa(0)

// 执行堆栈