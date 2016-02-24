## Timing Attacks
Node.js is an asynchronous event driven framework. When an area of code is blocking I/O by writing to the network or opening a file, it registers a callback function, triggers the relevant action and terminates. When the intended action is completed, the callback event is called by the Event Loop. This model is scalable as the threads never sit and wait but may cause problems with a function that takes longer then expected to complete. By default the Node.js process runs one thread per core while other processes wait in queue.

Using native string comparison compares by iterating the two (equal length) strings, comparing one character at a time, and stopping when the character differs. Attackers can use this to cause small delays in processing. This type of attack is called a timing attack, and it can be performed each time input impacts processing time. To prevent it, we need to make the strings comparison take the same amount of time regardless of the entered input, eg., xoring two passwords, and seeing if the result is zero.

### Defenses
- When implementing authentication checks, keep the process running in a constant amount of time by using secure-compare or other packages that aid in achieving constant time comparisons.
- Audit your modules by using the 'nsp' package or tracking Node advisories.
- Use tools in the hints section to check for timing vulnerabilities.

### Vulnerable Code View
```
function isAuthenticated(user, token) {
  var correctToken = FetchUserTokenFromDB(user);
  return token === correctToken;
}
```
