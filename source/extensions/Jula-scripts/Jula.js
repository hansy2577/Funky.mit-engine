// lua interpretor (not made by me :‹)

/*
make by a AI (GitHub copilot) sorry, because all the other real lua library is-
not working, hard to initiating make or to large to be implanted.
*/

function runlua(luaCode,id) {
  // AI part - Enhanced Lua to JavaScript transpiler
  
  let lines = luaCode.split('\n');
  let jsCode = '';
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Skip empty lines and comments
    if (!line.trim() || line.trim().startsWith('--')) continue;
    
    // Remove inline comments
    line = line.replace(/--.*$/, '');
    
    // ===== VARIABLE DECLARATIONS =====
    line = line.replace(/\blocal\s+/g, 'let ');
    
    // ===== FUNCTIONS =====
    line = line.replace(/\bfunction\s+(\w+)\s*\(/g, 'function $1(');
    if (line.match(/^function\s+\w+\s*\([^)]*\)\s*$/)) {
      line = line.replace(/(\))\s*$/, '$1 {');
    }
    line = line.replace(/\bfunction\s*\(/g, 'function(');
    
    // ===== CONTROL FLOW =====
    // Handle if statements
    if (line.trim().startsWith('if ')) {
      // Replace 'if not X then' with 'if (!X) {'
      line = line.replace(/\bif\s+not\s+(.+?)\s+then\s*$/g, 'if (!$1) {');
      // Replace 'if X then' with 'if (X) {'
      line = line.replace(/\bif\s+(.+?)\s+then\s*$/g, 'if ($1) {');
    }
    
    // Handle elseif statements
    else if (line.trim().startsWith('elseif ')) {
      line = line.replace(/\belseif\s+not\s+(.+?)\s+then\s*$/g, '} else if (!$1) {');
      line = line.replace(/\belseif\s+(.+?)\s+then\s*$/g, '} else if ($1) {');
    }
    
    // Handle else
    else if (line.trim() === 'else') {
      line = '} else {';
    }
    
    // Handle 'end'
    else if (line.trim() === 'end') {
      line = '}';
    }
    
    // Handle while
    else if (line.trim().startsWith('while ')) {
      line = line.replace(/\bwhile\s+not\s+(.+?)\s+do\s*$/g, 'while (!$1) {');
      line = line.replace(/\bwhile\s+(.+?)\s+do\s*$/g, 'while ($1) {');
    }
    
    // ===== LOGICAL OPERATORS =====
    line = line.replace(/\s+and\s+/g, ' && ');
    line = line.replace(/\s+or\s+/g, ' || ');
    line = line.replace(/\bnot\s+/g, '!');
    
    // ===== COMPARISON OPERATORS =====
    line = line.replace(/~=/g, '!==');
    line = line.replace(/==/g, '===');
    
    // ===== STRING CONCATENATION =====
    line = line.replace(/\.\./g, '+');
    
    // ===== BUILT-IN FUNCTIONS =====
    line = line.replace(/\bprint\(/g, 'console.log(');
    line = line.replace(/\btype\(/g, 'typeof ');
    line = line.replace(/\btostring\(/g, 'String(');
    line = line.replace(/\btonumber\(/g, 'Number(');
    
    // ===== TABLE/ARRAY OPERATIONS =====
    line = line.replace(/#(\w+)/g, '$1.length');
    
    // ===== FOR LOOPS =====
    line = line.replace(/\bfor\s+(\w+)=(\d+),(\d+)\s+do/g, 'for (let $1=$2; $1<=$3; $1++)');
    line = line.replace(/\bfor\s+(\w+)\s+in\s+(\w+)\s+do/g, 'for (let $1 in $2)');
    
    // ===== ADD SEMICOLONS WHERE NEEDED =====
    line = line.trim();
    if (line && !line.endsWith('{') && !line.endsWith('}') && !line.endsWith('(') && line !== '') {
      line = line + ';';
    }
    
    jsCode += line + '\n';
  }
  
  // Execute
  try {
    new Function(jsCode);
    LuaRun_playScript(jsCode,id);
  } catch (e) {
    alert('Lua compilation Error: ' + e.message);
    console.error('Generated JavaScript:\n', jsCode);
    console.error('Error:', e);
  }
}
function LuaRun_playScript(data,id) {
  var script = document.createElement("script")
  script.textContent = ""+data+"";
  script.id = id;
  document.body.appendChild(script)
}