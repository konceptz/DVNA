## Loose Comparison Violation
As a JavaScript developer you should be familiar with falsy/truthy values. When doing loose comparison (==), values such as false, 0, emptry strings "", NaN, null, and undefined all become false and all other values become true. The result of loose comparison depends on the order of operands being evaluated. When evaluating Boolean expressions, null and undefined both return false; in loose comparisons they do not. In short, loose comparison makes use of the == operand, whereas strict comparison uses the === operand.


### Defenses
- Always use the strict comparison operand === to avoid conversion issues
- These kind of operations can be exploited by attackers and often lead to unexpected results and logic errors in applications
- Avoid using loose comparisons in security contextual code
- Always operate your code in strict mode by applying 'use strict' at the beginning of your source file or at the beginning of a function

### Vulnerable Code View
```
Boolean(undefined);
Boolean(null);

/**
* Now with loose comparisons
*/
false == undefined; // what do you think this is going to return?
false ==  null;

/**
* What happens when you use this kind of logic in a security context?
* And what if we overlook defining a property on the authorized object but attempt to use it later? (isAuthorized)
*/
var authorized = {
  user: 'admin'
};

function isAuthorized() {
  // We didn't define this in the authorized object as a result it's going to return undefined
  return authorized && authorized.isAuthorized;
};

/**
* This check will fail because undefined is falsy
*/
if(isAuthorized() == false) {
  console.log('Logged in as administrator');
  return;
};

/**
* This check will pass because 'undefined' is falsy, as a result a user who isn't authorized is able to login.
*/
if (!isAuthorized()){
  console.log('You\'ve accessed a restricted area.');
};

```
