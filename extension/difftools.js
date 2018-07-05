
// diffs the styles applied to the last two inspected elements
var diffLastTwoInspected = function() {
  if (typeof $0 != 'undefined' && typeof $1 != 'undefined') {
    let firstStyle = window.getComputedStyle($0);
    let secondStyle = window.getComputedStyle($1);

    let ret = {};
    let diff = [];

    for (let i = 0; i < firstStyle.length; i++) {
      let firstVal = firstStyle.getPropertyValue(firstStyle[i]);

      if (secondStyle.hasOwnProperty(firstStyle[i])) {
        let secondVal = secondStyle.getPropertyValue(firstStyle[i]);

        if (secondVal != firstVal) {
          diff.push({
            'property': firstStyle[i],
            'first': firstVal,
            'second': secondVal
          });
        }
      } else if (firstVal != "" && firstVal != null){
        diff.push({
          'property': firstStyle[i],
          'first': firstVal,
          'second': null
        });
      }
    }

    // When looking through the second set, to be correct we should
    // only push diffs that weren't in the first set
    for (let i = 0; i < secondStyle.length; i++) {
      let secondVal = secondStyle.getPropertyValue(secondStyle[i]);

      if (!firstStyle.hasOwnProperty(secondStyle[i]) && secondVal != "" && secondVal != null) {
        diff.push({
          'property': secondStyle[i],
          'first': null,
          'second': secondVal
        });
      }
    }

    ret.diff = diff;
    ret.first = $0;
    ret.second = $1;

    return ret;
  }

  // If there haven't yet been two, just returns a result saying so
  return { status : 'Select another element to view style diff' };
};

chrome.devtools.panels.elements.createSidebarPane("difftool",
    function(sidebar) {
      // $0 and $1 are the first and second msot recently inspected elements
      function updateElementProperties() {
        sidebar.setExpression("(" + diffLastTwoInspected.toString() + ")()");
      }

      // Call the function initally to set things up
      updateElementProperties();

      // When the selection changes,
      chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
    }
);
