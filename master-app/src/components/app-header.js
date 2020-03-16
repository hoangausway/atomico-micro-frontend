import { h, customElement } from 'atomico'

const AppHeader = props => {
  return (
    <host shadowDom>
      <style>{style()}</style>
      <select id='apps'>
        <option value='volvo'>Volvo</option>
        <option value='saab'>Saab</option>
        <option value='opel'>Opel</option>
        <option value='audi'>Audi</option>
      </select>
    </host>
  )
}

AppHeader.props = {}

export default customElement('app-header', AppHeader)

// Helpers CSS
const style = () => `
:host {
  width: 100%;
  height: 48px;
  padding: 0 9px;
  background: blue;
  color: white;
}
`
