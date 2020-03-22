import { h, customElement } from 'atomico'
const AtomicoApp1 = props => {
  return (
    <host shadowDom>
      <style>{style()}</style>
      <div>Hello from AtomicoApp1</div>
    </host>
  )
}

AtomicoApp1.props = {}

export default customElement('atomico-app1', AtomicoApp1)

// Helpers CSS
const style = () => `
:host {
  width: 500px;
  height: 500px;
  color: green;
}
`
