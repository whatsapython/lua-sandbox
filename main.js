const objects = [
  { name: "Event", description: "Triggers actions in response to changes or actions." },
  { name: "Value", description: "Stores and updates data in scripts." },
  { name: "Part", description: "Physical object in the Roblox world." },
  { name: "Script", description: "Container for Lua code." }
]
const objectsPanel = document.getElementById("objects")
objectsPanel.innerHTML = objects.map(obj =>
  `<span title="${obj.description}">${obj.name}</span>`
).join(" ")

const codeEl = document.getElementById("code")
const runBtn = document.getElementById("runBtn")
const consoleEl = document.getElementById("console")
function showOutput(type, msg) {
  const div = document.createElement("div")
  div.className = type
  div.textContent = msg
  consoleEl.appendChild(div)
}
function clearConsole() {
  consoleEl.innerHTML = ""
}
runBtn.onclick = () => {
  clearConsole()
  const code = codeEl.value
  window.Fengari.load(code, {
    print: msg => showOutput("print", msg),
    warn: msg => showOutput("warn", msg)
  })()
}
window.Fengari = fengariWeb
window.onerror = (msg) => showOutput("error", msg)
