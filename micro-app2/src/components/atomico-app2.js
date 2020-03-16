import { h, customElement } from 'atomico'
const AtomicoApp2 = props => {
  return (
    <host shadowDom>
      <style>{style()}</style>
      <div>Hello from AtomicoApp2</div>
    </host>
  )
}

AtomicoApp2.props = {}

export default customElement('atomico-app2', AtomicoApp2)

// Helpers CSS
const style = () => `
:host {
  width: 100%;
  height: 100vh;
  color: red;
}
`
