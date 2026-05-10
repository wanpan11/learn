let getDPrivateField

class D {
  #privateField

  constructor(v) {
    this.#privateField = v
  }

  static {
    // Class static initialization blocks 用户初始化赋值
    getDPrivateField = d => d.#privateField
  }
}

const d = new D('private')

console.log('d ===> ', d)

getDPrivateField(d)

console.log('getDPrivateField ===> ')
