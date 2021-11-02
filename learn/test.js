const testObj = {}

function* wanpan(a) {
    var y = yield a + 1
    console.log(y)
}

const wanpan1 = wanpan(1)

testObj.wanpan1 = wanpan1

fetch('./person.json').then(res => {
    res.json()
}).then(json => {
    console.log(json)
})

export { testObj }