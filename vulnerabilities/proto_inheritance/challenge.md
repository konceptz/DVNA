## Prototype Inheritance Violation
ECMAScript Harmony introduces classes and other common languages support writing class-based inheritance. Before Harmony, JavaScript relied on prototypical inheritance. In JavaScript, every object has a base object called prototype. If you try to access an object's property and it's not defined, JavaScript returns the value from the prototype's property, if it exists. Otherwise it traverses up the hierarchy asking the prototype's parent if it has the property. Classical inheritance inherits the behavior from the parent class, without state. It inherits this behavior at the time that the object is instantiated. Prototypical inheritance inherits both behavior and state from the parent object on invocation. If the parent object changes at runtime then the state and behavior of the child object is affected. This boils down to being able to manipulate objects after they have been created, without access to the objects themselves. Changes to the prototype will affect all objects that have that prototype in their prototype chain. This leads to confusing and subtle bugs.

### Defenses
- Do not change language defined prototypes

### Vulnerable Code View
```
'use strict';

function ProtoVulnerableClass() {}

ProtoVulnerableClass.prototype.a = function () {
  console.log("ProtoVulnerableClass.a() invoked!");
};

ProtoVulnerableClass.prototype.b = function () {
  console.log("ProtoVulnerableClass.b() invoked!");
};

var protoCustom = new ProtoVulnerableClass();
protoCustom.a();

var protoCustomOverride = new ProtoVulnerableClass();
protoCustomOverride.__proto__.a = function() {
  console.log("ProtoVulnerableClass.a() overridden!");
};

protoCustomOverride.a();
protoCustom.a();

```
