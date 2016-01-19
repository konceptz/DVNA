## Scope Violation
Scope is a context within a program where a variable name can be used. JavaScript scope can be somewhat tricky to understand at first, and resulting program flow errors and security issues are common.
By default, variables are global. Omit the var keyword and you declare a global variable. This is the biggest security issue with JavaScript scopes. The previously discussed strict mode will save us from this by disallowing variable declaration without the var keyword, which means no more accidental global variables. It doesn’t save us from accidentally accessing the parent scopes’ variables, though. Accidentally overwriting a parent variable is a common mistake and typically results in unexpected system behavior or an application crash.

### Defenses
- Understand the scoping issues present in JavaScript to avoid unwanted changes in global and parent scopes.

### Vulnerable Code View
```
var i = 0;
  function containsGlobalVariable() {
    i = 256;
  }

  function determineGlobalVariable() {
    for (i = 0; i < 10; i++) {
      console.log(i);
      containsGlobalVariable();
      console.log(i);
    }
  }
  console.log(determineGlobalVariable());
})
```
