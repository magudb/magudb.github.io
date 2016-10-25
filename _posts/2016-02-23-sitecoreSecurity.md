---
layout: post
title: "Sitecore Security"
description: "NWebSec and Sitecote"
comments: true
keywords: "Sitecore, security, nwebsec"
---
k## Introduction - A year of breaches

The last year we saw the hacking of childrens toy , VTech lost 4,8 million records, the US prison system lost 70 million inmate phone calls and Ashely Madison lost 37 million users. Nobody is holy in this game, and we are properly always a step behind the attackes but we still need to do our best.

Security is becoming more and more important, Haveibeenpwned has 284,759,509 account which has been leaked. We need to take this seriously even when we do not have login information or shops we can become a delivery mechanism for malware. Security is a shared responsibility and just because you have a marketing site you still need to keep your users safe, for the users, customer and your company.

In this blog post i will look into [NWebSec](https://docs.nwebsec.com/en/4.2/) for enabling [Content Security Policy (CSP)](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) on your Sitecore Content Delivery (CD) nodes.

## What is Content Security Policy?

This is a security standard to help prevent [Cross-site Scripting (Xss)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)) and other content injection attacks. This is implemented using headers on the server response. So it is up to the users browser to ensure the rules are adhered to and block illegal requests.

### The different directives

*   default-src
    *   the default policy for retrieving content such as JavaScript, Images, CSS, Font's, AJAX requests, Frames. This will be reflected as default values in the other directives.
*   script-src
    *   Defines the valid javascript sources.
*   object-src
    *   Defines valid sources of plugins, like <object> or <embed>.    
*   style-src
    *   Defines the valid stylesheet sources.    
*   img-src
    *   Defines the valid image sources    
*   media-src
    *   Defines valid sources of audio and video, like <audio>, <video> elements.    
*   frame-src
    *   Defines valid sources for loading frames, This has been deprecated. Use Child-src    
*   font-src
    *   Defines valid sources of fonts.    
*   connect-src
    *   Applies to XMLHttpRequest, WebSocket or EventSource. If not allowed the browser sends a 400 HTTP status code.
*   sandbox
    *   Enables a sandbox for the requested resource similar to the iframe sandbox attribute. The sandbox applies a same origin policy, prevents popups, plugins and script execution is blocked.

#### Sources

To read more about the CSP 1/2 read this [Content Security Policy Reference](http://content-security-policy.com/)
<table><thead><tr><th>Value</th><th>Description</th></tr></thead><tbody><tr><td>`*`</td><td>Wildcard, allows any URL except data, blob, filesystem and schemes.</td></tr><tr><td>`'none'`</td><td>Prevents loading resources from any source.</td></tr><tr><td>`'self'`</td><td>Allows resources from the same origin.</td></tr><tr><td>`data:`</td><td>Allows resources via the data scheme like Base64 encoded images.</td></tr><tr><td>`_domain.udbjorg.net_`</td><td>Allows resources from that domain name.</td></tr><tr><td>`_*.udbjorg.net_`</td><td>Allows resources from the any subdomain under <span style="font-family: monospace;">udbjorg.net</span>.</td></tr><tr><td>`_https://img.udbjorg.net_`</td><td>Allows resources only over HTTPS matching the given domain.</td></tr><tr><td>`https:`</td><td>Allows resources only over HTTPS on any domain.</td></tr><tr><td>`'unsafe-inline'`</td><td>Allows use of inline source elements such as style attribute, onclick, or script tag bodies. By default doesn’t allow inline JavaScript unless you explicitly allow it.</td></tr><tr><td>`'unsafe-eval'`</td><td>Allows unsafe dynamic code evaluation such as eval(), If you need this enabled you can use 'unsafe-eval' but again this is not recommended as it is easy for untrusted code to sneak into eval blocks.</td></tr></tbody></table>

CSP level 1 is supported in all major browsers and in IE 10+11 with the X-Content-Security-Policy header and CSP Level 2 is less supported, see browser support for [Content Security Policy Level 1](http://caniuse.com/#feat=contentsecuritypolicy) and [Content Security Policy Level 2](http://caniuse.com/#search=csp).

For more on security see this [Both Sides Of The Attack - Troy Hunt & Niall Merrigan - Security Day 2016](https://vimeo.com/154956509) and [Web Security Essentials By Example - Troy Hunt - Security Day 2016](https://vimeo.com/154962595)

## Implementing NWebSec and Content Security Policy

For the purpose of this I wil be using **Sitecore 8.1 rev. 151207** stripped of all the Sitecore fat. This is not a requirement but for my vanity<sup>1</sup>.

### The Setup
This is "easy" to implement, but i will only recommend using it on CD's only, Since you will have to expose more attack vectors to make Sitecore CM and CD work with CSP.

1.  Create a Sitecore solution your favorite way, in my example i create an empty web application and dump Sitecore into that.
2.  PM> Install-Package NWebsec

and now we are protected, we just need to configure it for our needs.
This is a basic configuration where we have enabled CSP, in order to ensure that we can run the correct scripts, font and images we need to add sources.

<nwebsec>
    <httpHeaderSecurityModule xmlns="http://nwebsec.com/HttpHeaderSecurityModuleConfig.xsd"                               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"   xsi:noNamespaceSchemaLocation="NWebsecConfig/HttpHeaderSecurityModuleConfig.xsd">
      <securityHttpHeaders>
          <x-Content-Type-Options enabled="true" />
          <content-Security-Policy enabled="true">           
          </content-Security-Policy>
      </securityHttpHeaders>
    </httpHeaderSecurityModule>
  </nwebsec>

I will go through the options which we actually do something, all other will be ´self´ by the ´default-src´

**Default-src**
Set to self only, we will handle the specific overrides in the "children"
 <default-src self="true" />

**Script-src**
Her we will also set self but with 3 sources 
<script-src self="true">
    <add source="https://code.jquery.com" />
    <add source="https://www.cdnjs.com/"/>
    <add source="https://cdnjs.com/"/>
</script-src>
These are the javascript sources I use in my fancy demo website

**Img-src**
This is a little more "exciting" since we have Base64 images, we need to add ´data:´ and we need 
<img-src self="true">
    <add source="www.filldunphy.com"/>
    <add source="data:"/>
</img-src>
**Font-src**
We are using font-awesome which is hosted on Cloudflare, so we need to ensure we can load the font from there.
<font-src self="true">
    <add source="https://cdnjs.cloudflare.com"/>
</font-src>

###Reporting CSP violations
if you add this to you configuration NWebSEc will use the builtin reporting, i have implemented a simple reporter to Sitecore log.
 <report-uri enableBuiltinHandler="true"/>
 
public class Global : Sitecore.Web.Application
{
    protected void NWebSecHttpHeaderSecurityModule_CspViolationReported(object sender, CspViolationReportEventArgs e)
    {
        var report = e.ViolationReport;
        string msg =
            $"CSP - Blocked : {report.Details.BlockedUri}, which violated : {report.Details.ViolatedDirective} and Referrer : {report.Details.Referrer}";
        Sitecore.Diagnostics.Log.Warn(msg, sender);
    }
}

##X-frame-options
The X-Frame-Options HTTP response header can be used to indicate whether or not a browser should be allowed to render a page in a <frame>, <iframe> or <object>.

You should also do security on your iframes, for my solution I have used the option ´SameOrigin´

To read more see [The X-frame-options Response Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options)

<nwebsec>
    <httpHeaderSecurityModule xmlns="http://nwebsec.com/HttpHeaderSecurityModuleConfig.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"   xsi:noNamespaceSchemaLocation="NWebsecConfig/HttpHeaderSecurityModuleConfig.xsd">
      <securityHttpHeaders>     
       <x-Frame-Options policy="SameOrigin" />
        ...
      </securityHttpHeaders>
    </httpHeaderSecurityModule>
  </nwebsec>

## HTTP Strict Transport Security

Just enable it to to protect websites against protocol downgrade attacks and cookie hijacking. and you can force the browser to hard-code this enforcing [here](https://hstspreload.appspot.com/). But Troy Huns has alot more on the topic here, [Understanding Http Strict Transport Security (Hsts) And Preloading It Into The Browser](http://www.troyhunt.com/2015/06/understanding-http-strict-transport.html).

To enable it on your site add:
<nwebsec>
    <httpHeaderSecurityModule xmlns="http://nwebsec.com/HttpHeaderSecurityModuleConfig.xsd"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"   xsi:noNamespaceSchemaLocation="NWebsecConfig/HttpHeaderSecurityModuleConfig.xsd">
      <securityHttpHeaders>     
        <strict-Transport-Security max-age="365"  includeSubdomains="true" preload="true" />
        ...
      </securityHttpHeaders>
    </httpHeaderSecurityModule>
  </nwebsec>



## TLS/SSL Everything

For you and your users you should use TLS/SSL the ensure transport security, If you find certificates to expensive you can use [Let's Encrypt](https://letsencrypt.readthedocs.org/en/latest/), you can implement it in IIS [Using Let's Encrypt With Iis On Windows](http://weblog.west-wind.com/posts/2016/Feb/22/Using-Lets-Encrypt-with-IIS-on-Windows). 
You could use a proxy/load balancer to do TLS/SSL termination this would also lessen the load on your frontend server but i will require strict security behind the proxy.To learn more about TLS/SSL termination see [How To Set Up Nginx Load Balancing With Ssl Termination](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-load-balancing-with-ssl-termination)

##Wrapping up
All this is of course not that simple as i put it here, but i think you should use it and if you have to many sources you in you code this will blow up. But i think this will help you also with governace of your frontend dependencies so you don't end up with third-party jquery frenzy. 
I have add all my code to here - [Nwebsecdemo](https://github.com/magudb/NWebSecDemo)


<sup> 1. CMS as a platform or Sitecore is a monolith, bulks down development and time to market, most often ends up as a big ball of mud.</sup>