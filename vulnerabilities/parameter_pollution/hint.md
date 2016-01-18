## Hints

### Client-Side Parameter Pollution
The following scenario is a webmail service website from where a user can view and delete his/her emails. The URL of the webmail website is:

http://host/viewemail.jsp?client_id=79643215

The link to view an email is

<a href=”viewemail.jsp?client_id=79643215&action=view”> View </a>

The link to delete an email is:

<a href=”viewemail.jsp?client_id=79643215&action=delete”> Delete </a>

When the user clicks on either of the above links, the appropriate action will be performed. The two links are built from the URL. The ID will be requested and will be embedded/added in the href link together with the according action. Thus:

ID = Request.getParameter(“client_id”)
href_link = “viewemail.jsp?client_id=” + ID + ”&action=abc”

This web application, and more precisely the client_id, is vulnerable to HPP. As seen below, an attacker creates a URL and injects another parameter ‘action’ preceded by an encoded query string delimiter (e.g. %26) after the client_id parameter. This parameter holds the value ‘delete’:

http://host/viewemailn.jsp?client_id=79643215%26action%3Ddelete

After the creation of the malicious link, the page now contains two links which are injected with an extra action parameter. Thus:

<a href=viewemail.jsp?client_id=79643215&action=delete&action=view > View </a>
<a href=viewemail.jsp?client_id=79643215&action=delete&action=delete > Delete </a>

As shown in the table above, JSP will parse the two same parameters (action) and will return the first value. The JSP query Request.getParameter(“action”) will return ‘delete’ in both cases. Thus, the user will click either of the two links, View or Delete, but the action Delete will always be performed.

This is a simple example how an attacker can exploit an HTTP Parameter Pollution vulnerable website and cause malicious code to run or be executed without being detected.

### Server-Side Parameter Pollution
In the HPP Server-side the back-end environment of the web application will be affected. The attacker using HPP attacks will try to exploit the logic of the vulnerable web application by sending a triggered, or polluted URL, for example to access the database of a web application.

HPP Server-side can be also used to bypass several web application firewalls (WAFs) rules. Some WAFs only validate a single parameter occurrence, such as the first or the last one. In a case where the web technology concatenates the value of multiple parameters which are the same, such as ASP.NET/IIS, then an attacker can split the malicious code into those occurrences thus bypassing the security mechanism or rules of the web application firewall.

Moreover, URL rewriting can occur using HPP. For instance, an attacker can inject an encoded query string in order to cause the URL to be rewritten. An example can be seen below:

Encoded string:
http://host/xyz%26page%3dedit

Rewritten URL:
http://host/page.php?page=view&page=xyz&action=edit&id=0

As mentioned before, the capability of the injection depends on the attributes of the link and its exposed functionalities.

HPP Server-side attacks can also be used for cross-channel pollution and to bypass CSRF tokens.

In order to better understand the server-side HPP attack, the following example will try to explain how this attack can bypass web application firewall rules or signature-based filters using concatenation of parameters with the same values. The following URL/request is send to the server:

http://testaspnet.vulnweb.com/test/vuln.cgi?par1=val1&par2=val2

The web server will parse the above query and will split it into pairs (name/value) in order to be manipulated or used by the web application. Thus, the web application will take par1 and par2 with values val1 and val2 respectively. If the web application is vulnerable to HPP attacks, an attacker could exploit it and submit a malicious payload. Take the following case:

http://testaspnet.vulnweb.com/test/vuln.cgi?par1=val1&par1=val2

You can see that there are two par1 parameters, each holding two different values. In this case how is the application going to trigger this? It depends on the web technology, as seen in the Web Technologies section above. Because of the different handling methods of parameters, hackers can control them in order to avoid security mechanisms and attack the web application.

In another example, where the web technology is ASP.NET/IIS, a hacker can send the following request to the server:

http://testaspnet.vulnweb.com/test/vuln.cgi?par1=<script&par1=prompt.”…”> …

Since ASP.NET/IIS concatenates the values of the same parameters, the end result will be <script prompt”…”>. Consequently, an attacker can expand this into a complete cross-site scripting attack.

If there is an installed Web Application Firewall in front of this application then it will check each occurrence of the parameter separately against the rules for injection attacks. As a result, the web application firewall will check the first parameter par1=<script, which will not match any of the injection attack rules since this is not a malicious payload. Then it will make the same check for the second parameter which equals par2=src=”…”. Again, this is not considered as a dangerous payload and will not raise any alerts. Nevertheless, as mentioned before, ASP.NET/IIS will concatenate these values, based on how the technology parses these occurrences, resulting in executing an XSS attack (if it was expanded in a complete XSS payload).

This is an example how an attacker can bypass some web application firewalls rules using HPP, enabling further attacks.
