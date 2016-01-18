## HTTP Parameter Pollution (HPP)
HTTP Parameter Pollution pollutes the HTTP parameters of a web application in order to perform or achieve a specific malicious task/attack different from the intended behavior of the web application. HPP injects encoded query string delimiters in existing or other HTTP parameters (i.e. GET/POST/Cookie), which make it feasible to supersede parameter values that already exist to inject a new parameter or exploit variables from direct access. This attack affects all web technologies, whether running client-side or server-side. Generally, an attacker can use HPP vulnerabilities to:

- Prioritize injected parameters
- Alter or modify the intended application behavior
- Access and potentially exploit variables that are not handled properly
- Bypass WAFs rules or input validation mechanisms

Some web technologies parse the first or the last occurrence of the parameter, some concatenate all the inputs and others will create an array of parameters. Below is a list showing how each web technology might parse different values of the same parameters at the server-side.

- All occurrences of the specific parameter eg. p1=v1,v2
- Last occurrence eg. p1=v1
- First occurrence eg. p1=v1
- Turns values provided into an array eg. ARRAY(0x8b9059c)

Client-side HPP can be used to inject additional parameters to the URL links or other src attributes. Stored HPP can manipulate all tags with data, src, or href attributes and POST action forms.

### Defenses
- Implement an extensive and proper input validation scheme. This is going to vary by language and stack.
- Pay attention to how the framework you are using handles parameter triggering
- An awareness that such attacks will be performed against your web application

### Vulnerable Code View
```
// TODO
```
