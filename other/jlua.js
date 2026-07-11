// i took 2 days for AI to make this perfect lua to js, it probably the last time i use this 

let doc = document;

function runTextToLua(luaCode) {
  // AI part - Enhanced Lua to JavaScript transpiler
  
  let lines = luaCode.split('\n');
  let jsCode = '';
  let bracketStack = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Skip empty lines and comments
    if (!line.trim() || line.trim().startsWith('--')) continue;
    
    // Remove inline comments
    line = line.replace(/--.*$/, '');
    
    // ===== VARIABLE DECLARATIONS =====
    line = line.replace(/\blocal\s+/g, 'let ');
    line = line.replace(/\bvar\s+/g, 'let '); // NEW: Convert 'var' to 'let'
    
    // ===== CLEAN UP SPACING =====
    line = line.replace(/function\s*\(\s*\)/g, 'function()');
    
    // ===== SETINTERVAL TO LOOP =====
    line = line.replace(/\bsetInterval\(/g, 'loop(');
    
    // ===== HANDLE LOOP(FUNCTION() PATTERN =====
    if (line.includes('loop(') && line.includes('function()')) {
      line = line.replace(/loop\s*\(\s*function\s*\(\s*\)/g, 'loop(function()');
      if (line.trim().endsWith('function()')) {
        line = line + ' {';
        bracketStack.push('loop');
      }
    }
    
    // ===== FUNCTIONS =====
    else if (line.trim().match(/^function\s+\w+\s*\(\s*\)\s*$/)) {
      line = line.trim() + ' {';
      bracketStack.push('function');
    }
    
    // ===== CONTROL FLOW =====
    else if (line.trim().startsWith('if ')) {
      line = line.replace(/\bif\s+not\s+(.+?)\s+then\s*$/g, 'if (!$1) {');
      line = line.replace(/\bif\s+(.+?)\s+then\s*$/g, 'if ($1) {');
      bracketStack.push('if');
    }
    
    else if (line.trim().startsWith('elseif ')) {
      line = line.replace(/\belseif\s+not\s+(.+?)\s+then\s*$/g, '} else if (!$1) {');
      line = line.replace(/\belseif\s+(.+?)\s+then\s*$/g, '} else if ($1) {');
    }
    
    else if (line.trim() === 'else') {
      line = '} else {';
    }
    
    // ===== HANDLE END - REPLACE 'end' KEYWORD ANYWHERE IN THE LINE =====
    if (line.includes('end')) {
      line = line.replace(/\bend\b/g, '}');
      if (bracketStack.length > 0) {
        bracketStack.pop();
      }
    }
    
    else if (line.trim().startsWith('while ')) {
      line = line.replace(/\bwhile\s+not\s+(.+?)\s+do\s*$/g, 'while (!$1) {');
      line = line.replace(/\bwhile\s+(.+?)\s+do\s*$/g, 'while ($1) {');
      bracketStack.push('while');
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
    if (line &&
      !line.endsWith('{') &&
      !line.endsWith('}') &&
      !line.endsWith('(') &&
      !line.endsWith(',') &&
      bracketStack.length === 0 &&
      line !== '') {
      line = line + ';';
    }
    
    jsCode += line + '\n';
  }
  
  // ===== DEFINE HELPER FUNCTIONS =====
  const helpers = `
function loop(callback, interval) {
  setInterval(callback, interval);
}
`;
  
  // Execute
  try {
    new Function(jsCode);
    LuaRun_playScript(helpers + jsCode);
  } catch (e) {
    alert('Lua compilation Error: ' + e.message);
    console.error('Generated JavaScript:\n', helpers + jsCode);
    console.error('Error:', e);
  }
}




function LuaRun_getScript(src) 
{
  // get the .lua file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get",src, true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        PreError("getStageJson | fail to get the file, reson: "+allText, false, true)
      } else {
        runTextToLua(allText);
      }
    }
  }
  rawFile.send();
}

function LuaRun_playScript(code)
{
    var script = document.createElement("script")
    script.textContent = code;
    document.body.appendChild(script);
}