import { h, customElement, useEffect, useRef } from 'atomico'

const MicroApp = props => {
  const app = props.app
  const ref = useRef()

  useEffect(() => {
    if (!app || !app.src) return

    const container = ref.current
    loadApp(app, container)
    return () => unloadApp(app, container)
  }, [app.src])

  return (
    <host shadowDom>
      <style>{style()}</style>
      <div ref={ref} id='container' />
    </host>
  )
}

MicroApp.props = { app: Object }

export default customElement('micro-app', MicroApp)

// Helpers
/*
  Load remote app (microfrontend) having app.src and app.type
  - Check document.head.
  - If no script with src = app.src, add script with src = app.src
  - If the script exists, render web component with app.type
*/
const loadApp = (app, container) => {
  if (!app.src || !app.type || !container) return

  const script = document.head.querySelector('script[src="' + app.src + '"]')
  script
    ? renderApp(app.type, container)
    : addAppScript(app.src, app.type, container)
}

/*
  - Create new script element.
  - Add script to document.head (once)
  - Render app once script loaded.
*/
const addAppScript = (src, type, container) => {
  const newScript = document.createElement('script')
  newScript.src = src
  newScript.type = 'module'
  newScript.onload = () => renderApp(type, container)
  document.head.appendChild(newScript)
}

/*
  - Remove container's child element if there was one.
  - Otherwise, create element with app.type
  - Add the app element into the container
*/
const renderApp = (type, container) => {
  if (container.hasChildNodes()) {
    container.removeChild(container.childNodes[0])
  }
  const elm = document.createElement(type)
  container.appendChild(elm)
}

// Remove app from container (keeping script in document.head)
const unloadApp = (app, container) => {
  if (container.hasChildNodes()) {
    container.removeChild(container.childNodes[0])
  }
  // optional: remove script
  removeScript(app)
}

const removeScript = app => {
  const script = document.head.querySelector('script[src="' + app.src + '"]')
  if (script) {
    document.head.removeChild(script)
  }
}

// Helpers CSS
const style = () => `
:host {
  width: 100%;
  height: 100vh;
}
#container {
  width: 100%;
  height: 100vh;
  overflow: scroll;
}
`
