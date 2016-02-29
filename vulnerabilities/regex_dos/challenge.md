## Regex DoS (ReDoS)

A Denial of Service (DoS) attack attempts to interrupt users access to a site, application, or server. There are many types of DoS attacks but this attack specifically looks to exploit Regular Expression.

You can find yourself in a vulnerable position when using regular expressions that contain certain evil regex patterns (shown below). This is because the evil regex patterns allow for many possible matches. The regex engine will attempt to match the input value to the regex pattern with every possible combination before completing. So, as an invalid input value increases in size, the longer the regex engine will take to process before it determines there is no match.  

An **Evil Regex** can get stuck on crafted inputed. Evil Regex contains patterns such as:
- Grouping with repetition
- Repetition inside the repeated group
- Alternation with overlapping inside the repeated group

Examples of Evil Regex:
- `(a+)+`
- `([a-zA-Z]+)*`
- `(a|aa)+`
- `(a|a?)+`
- `(.*a){x} | for x > 10`

All the above are susceptible to the input: `aaaaaaaaaaaaaaaaaaaaaaaa!`

### Defenses

- Understand that Regex algorithms can be written in an efficient way.
- Avoid using **Evil Regex** patterns. For example, `(.*a){x}` can be rewritten to `([^a]*a){x,}`.
- Check out common validations on [OWASP](https://www.owasp.org/index.php/OWASP_Validation_Regex_Repository)

### Vulnerable Code View

```
function validateInputFormat(string) {
var inputExpression = /^((ab)*)+$/;
return inputExpression.test(string);
}

var input = "ababababababababababababababababababababababababababababa"

var start = process.hrtime();

console.log(validateInputFormat(input));
console.log(process.hrtime(start));
```
