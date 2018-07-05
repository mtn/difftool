
// A function to diff the styles applied to the last two inspected elements.
// If there haven't yet been two, just returns a result saying so.
var diffLastTwoInspected = function() {
  if (typeof $0 != 'undefined' && typeof $1 != 'undefined') {
    let firstStyle = ($0).style;
    let secondStyle = ($1).style;

    let firstStyleKeys = Object.getOwnPropertyNames(firstStyle);
    let secondStyleKeys = Object.getOwnPropertyNames(secondStyle);

    for (let i = 0; i < firstStyleKeys.length; i++) {
      if secondStyle.hasOwnProperty(firstStyleKeys[i]) {

      } else {
        // if it didn't have themthey are definitely different
      }
    }
    return { first: ($0).style, second: ($1).style, firstprops: props };
  } else {
    return { status : 'Select another element to view style diff' };
  }
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
