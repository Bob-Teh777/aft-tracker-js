addEventListener("focus", _ => {
  if (apicode !== "" && apicode !== null && typeof apicode !== "undefined") {
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
  }
});

addEventListener("blur", _ => {
  if (apicode !== "" && apicode !== null && typeof apicode !== "undefined") {
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

  }
});
