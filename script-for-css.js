/* global cssVars, css_beautify */

cssVars({
  // DEMO: Process only demo.css file
  include: 'link[href*="project.css"]',
  // DEMO: Treat modern browsers as legacy
  onlyLegacy: false,
  
  // DEMO: Toggles to see results
  // ----------------------------------------
  // preserveStatic: false,
  // preserveVars: true,
  // updateURLs: false,
  // variables: { '--color': 'purple' },
  // ----------------------------------------
  
  onSuccess: function(cssText, elm, url) {
    var srcElm = document.querySelector('#src');

    srcElm.textContent += cssText;
  },
  onComplete: function(cssText, styleNodes, cssVariables, benchmark) {
    var outElm = document.querySelector('#out');

    // Format CSS (external library)
    cssText = css_beautify(cssText);

    // Update <code> tag with CSS result
    outElm.textContent = cssText;
  }
