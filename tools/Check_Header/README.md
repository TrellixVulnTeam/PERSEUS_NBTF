## Check_Header

1) The Server header: describes the software used by the origin server that handled the request,
that is, the server that generated the response.

2) Content Security Policy (CSP): is an added layer of security that helps to detect and mitigate certain types of attacks, 
including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware.

3) The X-Content-Type-Options: header is used to protect against MIME sniffing vulnerabilities. 
These vulnerabilities can occur when a website allows users to upload content to a website however the user disguises a particular file type as something else. 
This can give them the opportunity to perform cross-site scripting and compromise the website.

4) The X-Frame-Options HTTP: response header can be used to indicate whether or not a browser should be allowed to render a page in a <frame>, <iframe>, <embed>
or <object>. Sites can use this to avoid click-jacking attacks, by ensuring that their content is not embedded into other sites.

5) The HTTP X-XSS-Protection: response header is a feature of Internet Explorer, Chrome and Safari that stops pages from loading when they detect reflected cross-site scripting (XSS) attacks. 
Although these protections are largely unnecessary in modern browsers when sites implement a strong Content-Security-Policy that disables the use of inline JavaScript ('unsafe-inline'), 
they can still provide protections for users of older web browsers that don't yet support CSP.

6) X-Permitted-Cross-Domain-Policies: Using Adobe products like PDF, Flash, etc.? 
You can implement this header to instruct the browser how to handle the requests over a cross-domain. 
By implementing this header, you restrict loading your site’s assets from other domains to avoid resource abuse.
