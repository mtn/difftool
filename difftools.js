
// diffs the styles applied to the last two inspected elements
var diffLastTwoInspected = function() {
  if (typeof $0 != 'undefined' && typeof $1 != 'undefined') {
    let firstStyle = ($0).style;
    let secondStyle = ($1).style;

    let firstStyleKeys = Object.getOwnPropertyNames(firstStyle);
    let secondStyleKeys = Object.getOwnPropertyNames(secondStyle);

    let diff = [];

    for (let i = 0; i < firstStyleKeys.length; i++) {
      if (secondStyle.hasOwnProperty(firstStyleKeys[i])) {
        if (secondStyle[firstStyleKeys[i]] != firstStyle[firstStyleKeys[i]]) {
          diff.push({
            'property': firstStyleKeys[i],
            'first': firstStyle[firstStyleKeys[i]],
            'second': secondStyle[firstStyleKeys[i]]
          });
        }
      } else {
        diff.push({
          'property': firstStyleKeys[i],
          'first': firstStyle[firstStyleKeys[i]],
          'second': null
        });
      }
    }

    for (let i = 0; i < secondStyleKeys.length; i++) {
      if (firstStyle.hasOwnProperty(secondStyleKeys[i])) {
        if (secondStyle[secondStyleKeys[i]] != firstStyle[secondStyleKeys[i]]) {
          diff.push({
            'property': secondStyleKeys[i],
            'first': firstStyle[secondStyleKeys[i]],
            'second': secondStyle[secondStyleKeys[i]]
          });
        }
      } else {
        diff.push({
          'property': firstStyleKeys[i],
          'first': null,
          'second': secondStyle[secondStyleKeys[i]]
        });
      }
    }

    return diff;
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
