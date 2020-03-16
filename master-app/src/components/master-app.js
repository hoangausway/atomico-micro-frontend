import { h, customElement, useState } from 'atomico'

import './app-header'
import './micro-app'

const apps = [
  {
    id: '1',
    title: 'Atomico App 1',
    src: 'http://localhost:8001/index.js',
    type: 'atomico-app1'
  },
  {
    id: '2',
    title: 'Atomico App 2',
    src: 'http://localhost:8002/index.js',
    type: 'atomico-app2'
  }
]

const MasterApp = props => {
  const [app, setApp] = useState(null)

  return (
    <host shadowDom>
      <style>{style()}</style>
      <div>
        <button onclick={e => setApp(apps[0])}>Atomico App 1</button>
        <button onclick={e => setApp(apps[1])}>Atomico App 2</button>
      </div>
      {app ? <micro-app app={app} /> : prompt()}
    </host>
  )
}

MasterApp.props = {}

export default customElement('master-app', MasterApp)

// Helpers HTML
const prompt = () => (
  <div className='prompt'>
    <p>Click buttons to load micro apps.</p>
    <p>
      Expected App 1 available at http://localhost:8001, App 2 at
      http://localhost:8002
    </p>
    <hr />
    <p>
      <span>ISSUE:</span> Begin with any app is OK. However, click another app
      will get error.
    </p>
    <p>
      <span>
        Uncaught SyntaxError: Identifier 'HOOK_MOUNT' has already been declared
        at constants.js:1
      </span>
    </p>
  </div>
)

// Helpers CSS
const style = () => `
  :host {
    display: grid;
    width: 100%;
    height: 100vh;
    padding: 6px;
    grid-template-columns: 1fr ;
    grid-template-rows: '48px 1fr'};
  }
  micro-app {
    width: 300px,
    height: 95vh
    background: red;
    color: white;
  }
  .prompt {
    font-size: 0.8rem;
  }
  span {
    color: red;
  }
`
