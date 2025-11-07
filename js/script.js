function setcookie(cookiename, cookievalue) {
  document.cookie = `${cookiename}=${cookievalue}`;
  apicode = getCookie('apicode');
  username = getCookie('username');
}

function setCredCookies() {
  setcookie('apicode', document.getElementById('accesscode').value);
  setcookie('username', document.getElementById('username').value);
  document.getElementById("main-content").style.display = "block";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

async function copyContent(textToCopy) {
  try {
    await navigator.clipboard.writeText(textToCopy);
    console.log('Text copied to clipboard');
    alert("Successfully copied!")
    // You could also display a success message to the user here

  } catch (err) {
    alert("There was an error: ", err)
    console.error('Failed to copy text: ', err);
    // Handle the error, e.g., display an error message
  }
}

// Attach this function to a button click event
// <button onclick="copyContent()">Copy Text</button>

function isDevToolsOpenByTiming() {
  const start = new Date();
  debugger; // This will pause if DevTools are open
  const end = new Date();
  return (end - start) > 100; // Adjust threshold as needed
}

function devToolsNoCheat() {
	// Example usage:
	if (isDevToolsOpenByTiming()) {
	  document.getElementsByClassName("main-content")[0].innerHTML = "<h1>Hey, you there. You know exactly what you\'re doing. But guess who also knows? Me!</h1>";
	}
}

setInterval(devToolsNoCheat, 100);

function toggleblocks() {
    const editor = document.getElementById("blockeditor");
    const main = document.getElementById("mainframe");

    const isBlocksShown = window.getComputedStyle(editor).display !== "none";

    if (isBlocksShown) {
        editor.style.display = "none";
        main.style.width = "70%";
    } else {
        editor.style.display = "flex";
        main.style.width = "5%";
    }

    // The toolbox gets passed to the configuration options during injection.
    // workspace = Blockly.inject('blockDiv', {toolbox: document.getElementById('toolbox')});
}

function togglekahoot() {
    const editor = document.getElementById("kahootframe");
    const main = document.getElementById("mainframe");

    const isBlocksShown = window.getComputedStyle(editor).display !== "none";

    if (isBlocksShown) {
        editor.style.display = "none";
        main.style.width = "70%";
    } else {
        editor.style.display = "flex";
        main.style.width = "5%";
    }

    // The toolbox gets passed to the configuration options during injection.
    // workspace = Blockly.inject('blockDiv', {toolbox: document.getElementById('toolbox')});
}

Blockly.common.defineBlocksWithJsonArray([{
  "type": "on_start",
  "tooltip": "On start",
  "helpUrl": "",
  "message0": "on start %1",
  "args0": [
    {
      "type": "input_dummy",
      "name": "NAME"
    }
  ],
  "nextStatement": null,
  "colour": 215
}]);

Blockly.common.defineBlocksWithJsonArray([{
  "type": "print",
  "tooltip": "Prints string to console",
  "helpUrl": "",
  "message0": "print %1 %2",
  "args0": [
    {
      "type": "input_dummy",
      "name": "title"
    },
    {
      "type": "input_value",
      "name": "string",
      "align": "CENTRE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120,
  "inputsInline": true
}]);

Blockly.common.defineBlocksWithJsonArray([{
  "type": "timewait",
  "tooltip": "Pauses the thread for (number) of seconds.",
  "helpUrl": "",
  "message0": "wait for %1 %2 seconds %3",
  "args0": [
    {
      "type": "input_dummy",
      "name": "title"
    },
    {
      "type": "input_value",
      "name": "valuesleep"
    },
    {
      "type": "input_dummy",
      "name": "text"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 225,
  "inputsInline": true
}]);

Blockly.common.defineBlocksWithJsonArray([{
  "type": "machinePin",
  "tooltip": "Sets value of pin to input",
  "helpUrl": "",
  "message0": "set pin %1 %2 value to %3 %4",
  "args0": [
    {
      "type": "input_dummy",
      "name": "title"
    },
    {
      "type": "input_value",
      "name": "pin",
      "align": "CENTRE",
      "check": "Number"
    },
    {
      "type": "input_dummy",
      "name": "text1"
    },
    {
      "type": "input_value",
      "name": "value",
      "align": "CENTRE",
      "check": "Boolean"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120,
  "inputsInline": true
}]);

var workspace = Blockly.inject('blockDiv', {toolbox: document.getElementById('toolbox')});

const pythonGenerator = python.pythonGenerator;
const Order = python.Order;

python.pythonGenerator.forBlock['print'] = function(block, generator) {
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const value_string = generator.valueToCode(block, 'string', Order.NONE);

  // TODO: Assemble python into the code variable.
  const code = `print(${value_string})\ntime.sleep(0.001)\n`;
  return code;
}

python.pythonGenerator.forBlock['timewait'] = function(block, generator) {
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const value_sleep = generator.valueToCode(block, 'valuesleep', Order.NONE);

  // TODO: Assemble python into the code variable.
  const code = `time.sleep(${value_sleep})\n`;
  return code;
}


python.pythonGenerator.forBlock['on_start'] = function(block, generator) {
  // TODO: Assemble python into the code variable.
  const code = "import time\nimport machine\nimport random\n\n";
  return code;
}

python.pythonGenerator.forBlock['machinePin'] = function(block, generator) {
  // TODO: change Order.ATOMIC to the correct operator precedence strength
  const value_pin = generator.valueToCode(block, 'pin', Order.NONE);
  const value_value = generator.valueToCode(block, 'value', Order.NONE);

  // TODO: Assemble python into the code variable.
  const code = `machine.Pin(${value_pin}, machine.Pin.OUT).value(${value_value})\ntime.sleep(0.001)\n`;
  return code;
}

function compileCode() {
    var pythonCode = python.pythonGenerator.workspaceToCode(workspace);
    return pythonCode;
};

var username = getCookie('username');
var apicode = getCookie('apicode');
var curActive = false;

const url = 'https://api.jsonbin.io/v3/b/68f5b481ae596e708f1e4ec3';

// Track whether presenter or projector is the active window
addEventListener("focus", _ => {
	// First, GET the current data
fetch(url, {
  method: 'GET',
  headers: {
    'X-Access-Key': apicode,
    'X-Bin-Meta': 'false'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET failed: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Modify the data
    const timestamp = Math.floor(Date.now() / 1000); // UNIX timestamp
    data[username] = `T${timestamp}`;

    console.log("Updated data:", data);

    // PUT the updated data back
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': apicode
      },
      body: JSON.stringify(data)
    });
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`PUT failed: ${response.status}`);
    }
    return response.text();
  })
  .then(result => {
    console.log("PUT response:", result);
  })
  .catch(error => {
    console.error("Error:", error);
  });
});

addEventListener("blur", _ => {
	// First, GET the current data
fetch(url, {
  method: 'GET',
  headers: {
    'X-Access-Key': apicode,
    'X-Bin-Meta': 'false'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET failed: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Modify the data
    const timestamp = Math.floor(Date.now() / 1000); // UNIX timestamp
    data[username] = `F${timestamp}`;

    console.log("Updated data:", data);

    // PUT the updated data back
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': apicode
      },
      body: JSON.stringify(data)
    });
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`PUT failed: ${response.status}`);
    }
    return response.text();
  })
  .then(result => {
    console.log("PUT response:", result);
  })
  .catch(error => {
    console.error("Error:", error);
  });

});



