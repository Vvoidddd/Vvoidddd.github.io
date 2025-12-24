var state = {
  stack: null,
  type: null,
  flow: null,
  env: "local",
  custom: {},
  minimize: false,
  addNote: true,
  formatStyle: "default"
};

// Configuration loaded from static/config.json
var CONFIG = null;

fetch('static/config.json').then(function(res){ return res.json(); }).then(function(cfg){
  CONFIG = cfg;
}).catch(function(e){
  console.error('Failed to load config.json', e);
});

var stackDisplay = document.getElementById("stack-display");
var typeDisplay  = document.getElementById("type-display");
var flowDisplay  = document.getElementById("flow-display");
var envDisplay   = document.getElementById("env-display");
var keyCount     = document.getElementById("key-count");
var output       = document.getElementById("output");
var copyBtn      = document.getElementById("copy");
var customBox    = document.getElementById("custom");
var minimizeBox  = document.getElementById("minimize");
var addNoteBox   = document.getElementById("add-note");
var formatStyleSelect = document.getElementById("format-style");

function parseCustom(text) {
  var obj = {};
  var lines = text.split("\n");

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf("=") !== -1) {
      var parts = lines[i].split("=");
      obj[parts[0].trim()] = parts.slice(1).join("=").trim();
    }
  }
  return obj;
}

customBox.oninput = function () {
  state.custom = parseCustom(customBox.value);
  update();
};

minimizeBox.onchange = function () {
  state.minimize = minimizeBox.checked;
  update();
};

addNoteBox.onchange = function () {
  state.addNote = addNoteBox.checked;
  update();
};

formatStyleSelect.onchange = function () {
  state.formatStyle = formatStyleSelect.value;
  update();
};

var groups = document.querySelectorAll("[data-group]");

for (var g = 0; g < groups.length; g++) {
  (function (group) {
    var buttons = group.querySelectorAll("button");
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].onclick = function () {
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove("active");
        }
        this.classList.add("active");

        state[group.getAttribute("data-group")] =
          this.getAttribute("data-value");

        update();
      };
    }
  })(groups[g]);
}

function updateHUD(count) {
  stackDisplay.textContent = state.stack || "NONE";
  typeDisplay.textContent  = state.type  || "NONE";
  flowDisplay.textContent  = state.flow  || "NONE";
  envDisplay.textContent   = state.env.toUpperCase();
  keyCount.textContent     = count;
}

function update() {
  if (!CONFIG) {
    console.warn('CONFIG not loaded yet');
    return;
  }

  // If flow selected, override stack/type
  var stackKey = state.stack;
  var typeKey = state.type;
  if (state.flow && CONFIG.flows && CONFIG.flows[state.flow]) {
    stackKey = CONFIG.flows[state.flow].stack;
    typeKey = CONFIG.flows[state.flow].type;
  }

  if (!stackKey || !typeKey) {
    return;
  }

  var envKey = state.env || 'local';

  var varsCombined = {};
  // Environments
  if (CONFIG.environments && CONFIG.environments[envKey]) {
    Object.assign(varsCombined, CONFIG.environments[envKey]);
  }
  // Stack vars
  if (CONFIG.stacks && CONFIG.stacks[stackKey] && CONFIG.stacks[stackKey].vars) {
    Object.assign(varsCombined, CONFIG.stacks[stackKey].vars);
  }
  // Type vars
  if (CONFIG.types && CONFIG.types[typeKey] && CONFIG.types[typeKey].vars) {
    Object.assign(varsCombined, CONFIG.types[typeKey].vars);
  }
  // Custom keys
  Object.assign(varsCombined, state.custom || {});

  // Standard defaults (mirrors server defaults)
  var standardDefaults = {
    "APP_NAME": "MyApp",
    "APP_KEY": "base64_encoded_key_here",
    "APP_URL": "http://localhost",
    "LOG_CHANNEL": "stack",
    "CACHE_DRIVER": "file",
    "GENERATE_SOURCEMAP": "false",
    "FRONTEND_URL": "http://localhost:3000",
    "BACKEND_URL": "http://localhost:3001",
    "WEBSOCKET_URL": "ws://localhost:3001",
    "FILE_UPLOAD_PATH": "./uploads",
    "SESSION_SECRET": "your_session_secret",
    "CSRF_SECRET": "your_csrf_secret",
    "STRIPE_WEBHOOK_SECRET": "whsec_your_webhook_secret",
    "STRIPE_PRICE_ID": "price_your_price_id",
    "STRIPE_PRODUCT_ID": "prod_your_product_id",
    "JWT_SECRET": "your_jwt_secret_here",
    "REDIS_URL": "redis://localhost:6379",
    "CORS_ORIGIN": "http://localhost:3000",
    "LOG_LEVEL": "info",
    "DB_HOST": "localhost",
    "DB_PORT": "5432",
    "DB_NAME": "myapp_db",
    "DB_USER": "myapp_user",
    "DB_PASSWORD": "myapp_password",
    "DB_SSL": "true",
    "DB_MAX_CONNECTIONS": "20"
  };

  // Fill defaults if missing
  for (var k in standardDefaults) {
    if (!(k in varsCombined)) varsCombined[k] = standardDefaults[k];
  }

  // Render using env.j2-like rules
  function renderEnv(vars, options) {
    options = options || {};
    var lines = [];
    var keys = Object.keys(vars);
    keys.sort();
    if (!state.minimize) {
      lines.push('# Generated .env template');
      lines.push('# Stack: ' + (CONFIG.stacks[stackKey] ? CONFIG.stacks[stackKey].name : 'Custom'));
      lines.push('# Type: ' + (CONFIG.types[typeKey] ? CONFIG.types[typeKey].name : 'Custom'));
      lines.push('# Environment: ' + (envKey || 'Custom').toUpperCase());
      lines.push('# Generated on: ' + new Date().toISOString());
      lines.push('#');
    }

    keys.forEach(function(k){
      var v = vars[k];
      if (state.formatStyle === 'uppercase') {
        lines.push(k.toUpperCase() + '=' + v);
      } else if (state.formatStyle === 'lowercase') {
        lines.push(k.toLowerCase() + '=' + v);
      } else if (state.formatStyle === 'quoted') {
        lines.push(k + '="' + v + '"');
      } else if (state.formatStyle === 'export') {
        lines.push('export ' + k + '=' + v);
      } else {
        lines.push(k + '=' + v);
      }
    });

    return lines.join('\n');
  }

  var rendered = renderEnv(varsCombined);
  output.textContent = rendered;
  updateHUD(Object.keys(varsCombined).length || 0);
}

copyBtn.onclick = function () {
  var content = output.textContent;
  if (state.addNote && !content.includes("# .ENV Generator By Void")) {
    content = "# .ENV Generator By Void\n" + content;
  }
  navigator.clipboard.writeText(content);
};

// ASCII Logo Twinkling Animation
document.addEventListener('DOMContentLoaded', function() {
  console.log('Twinkling script started');
  // removed temporary debug background color
  
  var asciiLogo = document.getElementById('ascii-logo');
  if (!asciiLogo) {
    console.error('ASCII logo element not found');
    return;
  }
  
  console.log('ASCII logo found, text length:', asciiLogo.textContent.length);
  var html = '';
  
  // Wrap each non-space character in a span
  for (var i = 0; i < text.length; i++) {
    var char = text[i];
    if (char === ' ' || char === '\n') {
      html += char;
    } else {
      html += '<span class="ascii-char">' + char + '</span>';
    }
  }
  
  asciiLogo.innerHTML = html;
  
  var chars = asciiLogo.querySelectorAll('.ascii-char');
  console.log('Found', chars.length, 'characters to twinkle');
  
  function twinkle() {
    // Randomly select 3-8 characters to twinkle
    var numTwinkles = Math.floor(Math.random() * 6) + 3;
    var twinklingChars = [];
    
    for (var i = 0; i < numTwinkles; i++) {
      var randomIndex = Math.floor(Math.random() * chars.length);
      if (twinklingChars.indexOf(randomIndex) === -1) {
        twinklingChars.push(randomIndex);
      }
    }
    
    // Add twinkle class to selected characters
    twinklingChars.forEach(function(index) {
      console.log('Twinkling character at index', index);
      chars[index].classList.add('twinkle');
      
      // Remove twinkle class after 1 second
      setTimeout(function() {
        console.log('Removing twinkle from character at index', index);
        chars[index].classList.remove('twinkle');
      }, 1000);
    });
  }
  
  // Start twinkling every 0.5-1 seconds (for testing)
  setInterval(twinkle, Math.random() * 500 + 500);
  
  // Initial twinkle
  setTimeout(twinkle, 500);
});
