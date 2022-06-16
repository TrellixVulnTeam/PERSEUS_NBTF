<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">

  <xsl:output method="html" indent="yes" encoding="UTF-8" />

  <xsl:variable name="generated">
    <xsl:value-of select="/netsparker/@generated" />
  </xsl:variable>

  <xsl:template match="vulnerability">

    <xsl:apply-templates select="type"></xsl:apply-templates>
    <xsl:apply-templates select="@confirmed"></xsl:apply-templates>
    <xsl:apply-templates select="url"></xsl:apply-templates>
    <xsl:apply-templates select="severity"></xsl:apply-templates>
    <xsl:apply-templates select="certainty"></xsl:apply-templates>
    <xsl:apply-templates select="rawrequest"></xsl:apply-templates>
    <xsl:apply-templates select="injectionrequest"></xsl:apply-templates>
    <xsl:apply-templates select="rawresponse"></xsl:apply-templates>
    <xsl:apply-templates select="injectionresponse"></xsl:apply-templates>
    <xsl:apply-templates select="extrainformation"></xsl:apply-templates>
    <xsl:apply-templates select="proofs"></xsl:apply-templates>
    <xsl:apply-templates select="classification"></xsl:apply-templates>
    <xsl:apply-templates select="knownvulnerabilities"></xsl:apply-templates>
  </xsl:template>

  <xsl:template match="knownvulnerabilities">
    <h4>Known Vulnerabilities in this Version:</h4>
    <xsl:apply-templates select="knownvulnerability"></xsl:apply-templates>
  </xsl:template>

  <xsl:template match="knownvulnerability">
    <xsl:apply-templates select="title"></xsl:apply-templates>
    <xsl:apply-templates select="severity"></xsl:apply-templates>
    <xsl:apply-templates select="references"></xsl:apply-templates>
    <xsl:apply-templates select="affectedversions"></xsl:apply-templates>
  </xsl:template>

  <xsl:template match="target">

    <xsl:apply-templates select="url"></xsl:apply-templates>
    <xsl:apply-templates select="scantime"></xsl:apply-templates>

  </xsl:template>

  <xsl:template match="/">
    <html>
      <head>
        <style type="text/css">
          body
          {
          font-family: Calibri, Verdana;
          margin: 0px;
          background-color: #FFFFFF;
          color: #000000;
          }

          h1, h2, h3
          {
          font-family: Cambria, "Times New Roman";
          font-weight:bold;
          color: #333;
          width: 100%;
          padding:0;
          }

          h1
          {
          font-size: 17pt;
          background-color:#efefef;
          border-bottom: 3px solid black;
          padding: 10pt;
          text-align: center;
          }

          h2
          {
          font-size: 15pt;
          border-bottom:3px solid black;
          padding: 5pt;
          text-align: left;
          }

          h3
          {
          font-size: 14pt;
          border-bottom:2px solid #aaa;
          }

          h4
          {
          font-size: 12pt;
          border-bottom:2px solid #aaa;
          }

          pre
          {
          font-family: Consolas, Lucida Console;
          margin: 0;
          margin-left: 5pt;
          padding-left: 15pt;
          border-left: 2px solid #aaa;
          font-size: .7em;
          }

          b
          {
          color: #777;
          font-size: 1.04em;
          line-height: 1.4em;
          }

          #container
          {
          text-align:left;
          margin: 30pt;
          }



        </style>
        <title>Netsparker Scan - Vulnerabilities List</title>
      </head>
      <body>
        <div id="container">
          <h1>
            Netsparker Scan Report (<xsl:value-of select="$generated"/>)
          </h1>
          <h2>
            Netsparker Scan Report Summary
          </h2>
          <div>
            <xsl:apply-templates />
          </div>
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="target/url">
    <b>Target URL: </b>
    <xsl:value-of select="."/>
    <br/>
  </xsl:template>
  <xsl:template match="target/scantime">
    <b>Scan Time: </b>
    <xsl:value-of select="."/>
  </xsl:template>
  <xsl:template match="type">
    <div>
      <h3>
        <xsl:value-of select="."/>
      </h3>
    </div>
  </xsl:template>
  <xsl:template match="@confirmed">
    <b>Confirmed: </b>
    <xsl:value-of select="."/>
    <br />
  </xsl:template>
  <xsl:template match="url">
    <b>Vulnerability URL: </b>
    <xsl:value-of select="."/>
    <br />
  </xsl:template>
  <xsl:template match="severity">
    <b>Severity: </b>
    <xsl:value-of select="."/>
    <br />
  </xsl:template>
  <xsl:template match="certainty">
    <b>Certainty: </b>
    <xsl:value-of select="format-number(., '%')"/>
    <br />
  </xsl:template>
  <xsl:template match="rawrequest">
    <b>Raw Request: </b>
    <pre>
      <xsl:value-of select="."/>
    </pre>
  </xsl:template>
  <xsl:template match="injectionrequest">
    <b>Injection Request: </b>
    <pre>
      <xsl:value-of select="."/>
    </pre>
  </xsl:template>
  <xsl:template match="rawresponse">
    <b>Raw Response:</b>
    <pre>
      <xsl:value-of select="."/>
    </pre>
  </xsl:template>
  <xsl:template match="injectionresponse">
    <b>Injection Response:</b>
    <pre>
      <xsl:value-of select="."/>
    </pre>
  </xsl:template>
  <xsl:template match="extrainformation">
    <xsl:if test="count(./info) > 0">
      <b>Extra Information: </b>
      <br />
      <ul>
        <xsl:for-each select="./info">
          <li>
            <xsl:value-of select="@name"/> : <xsl:value-of select="."/>
          </li>
        </xsl:for-each>
      </ul>
    </xsl:if>
  </xsl:template>
  <xsl:template match="title">
    <b>Title: </b>
    <xsl:value-of select="."/>
    <br />
  </xsl:template>
  <xsl:template match="references">
    <b>References: </b>
    <xsl:value-of select="."/>
    <br />
  </xsl:template>
  <xsl:template match="affectedversions">
    <b>Affected Versions: </b>
    <xsl:value-of select="."/>
    <br />
  </xsl:template>
  <xsl:template match="classification">
    <b>Classifications: </b>
    <ul>
      <xsl:if test="./OWASP2013">
        <li>
        <b>OWASP-2013: </b>
        <xsl:value-of select="./OWASP2013"/>
        </li>
      </xsl:if>
      <xsl:if test="./OWASP2017">
        <li>
        <b>OWASP-2017: </b>
        <xsl:value-of select="./OWASP2017"/>
        </li>
      </xsl:if>
      <xsl:if test="./WASC">
        <li>
        <b>WASC: </b>
        <xsl:value-of select="./WASC"/>
        </li>
      </xsl:if>
      <xsl:if test="./CWE">
        <li>
        <b>CWE: </b>
        <xsl:value-of select="./CWE"/>
        </li>
      </xsl:if>
      <xsl:if test="./CAPEC">
        <li>
        <b>CAPEC: </b>
        <xsl:value-of select="./CAPEC"/>
        </li>
      </xsl:if>
      <xsl:if test="./PCI32">
        <li>
        <b>PCI3.2: </b>
        <xsl:value-of select="./PCI32"/>
        </li>
      </xsl:if>
      <xsl:if test="./HIPAA">
        <li>
        <b>HIPAA: </b>
        <xsl:value-of select="./HIPAA"/>
        </li>
      </xsl:if>
      <xsl:if test="./OWASPPROACTIVECONTROLS">
        <li>
        <b>OWASP-PC: </b>
        <xsl:value-of select="./OWASPPROACTIVECONTROLS"/>
        </li>
      </xsl:if>
      <xsl:if test="./OWASPPC">
        <li>
        <b>OWASP-PC: </b>
        <xsl:value-of select="./OWASPPC"/>
        </li>
      </xsl:if>
      <xsl:if test="./ISO27001">
        <li>
        <b>ISO27001: </b>
        <xsl:value-of select="./ISO27001"/>
        </li>
      </xsl:if>
    </ul>
  </xsl:template>
  <xsl:template match="CVSS">
    <xsl:if test="normalize-space(.)">
      <b>CVSS3.0: </b>
      <xsl:for-each select="score">
        <i>
          <xsl:value-of select="type"/>:
        </i> <xsl:value-of select="value"/> (<xsl:value-of select="severity"/>)
      </xsl:for-each>
    </xsl:if>
    <br/>
    <b>CVSS Vector String: </b>
    <xsl:value-of select="vector"/>
  </xsl:template>
  <xsl:template match="proof/key">
    <b>
      <xsl:value-of select="."/>
    </b>
  </xsl:template>
  <xsl:template match="proof/value">
    <pre>
      <xsl:value-of select="."/>
    </pre>
  </xsl:template>
</xsl:stylesheet>