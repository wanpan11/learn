const template = document.createElement('template')
template.innerHTML = `
<style>
:host{
    font-size:32px;
    line-height: 70px;
}
.text{
    color: #fff;
}
</style>
    <div class='text'>webComponent template customElements</div>
`

class OrderCar extends HTMLElement {
  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'closed' })
    shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('order-card', OrderCar)
const body = document.getElementsByTagName('body')[0]
body.appendChild(document.createElement('order-card'))
