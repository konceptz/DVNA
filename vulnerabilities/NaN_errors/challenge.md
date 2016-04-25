## NaN Errors
JavaScript represents all numbers in double floating point numbers which in some cases result in unexpected errors. To give an example, think of shopping cart or transactional data that require precise calculations. In such cases, you don't want to introduce strings because of the resulting type conversion mix-ups resulting in NaN errors.

### Defenses
- Use NaN checks by incorporating the use of parseInt() and parseFloat() when doing string conversions

### Vulnerable Code View
```
// What is the correct value of the calculation below?
var result = 3 + 5 + "6";

```
