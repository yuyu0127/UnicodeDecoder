window.onload = function() {
  const body = document.querySelector('body');

  // body内のUnicodeっぽい文字列をデコード
  body.innerHTML = decodeUnicode(body.innerHTML);

  // 要素が追加されるたび、その要素内のUnicodeっぽい文字列をデコード
  const obs = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          node.innerHTML = decodeUnicode(node.innerHTML);
        }
      }
    }
  });

  obs.observe(body, { childList: true, subtree: true });

  function decodeUnicode(str) {
    return str.replace(/\\u([a-fA-F0-9]{4})/g, (_, m1) => String.fromCharCode(parseInt(m1, 16)));
  }
};