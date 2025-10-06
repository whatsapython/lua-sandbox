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
  try {
    const { lua, lauxlib, lualib, to_jsstring, to_luastring } = fengari
    const L = lauxlib.luaL_newstate()
    lualib.luaL_openlibs(L)
    lua.lua_pushjsfunction(L, function(L) {
      const n = lua.lua_gettop(L)
      let args = []
      for (let i = 1; i <= n; i++) {
        args.push(to_jsstring(lua.lua_tolstring(L, i)))
      }
      showOutput("print", args.join(" "))
      return 0
    })
    lua.lua_setglobal(L, to_luastring("print"))
    lauxlib.luaL_loadstring(L, to_luastring(code))
    lua.lua_pcall(L, 0, 0, 0)
  } catch (err) {
    showOutput("error", err.message)
  }
}
