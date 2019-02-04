// deletes 'bad' characters
function delLastChars(sourceString, chars = [], reverse = false) {
  let finalString = String(sourceString);
  let nextIteration = true;

  while (nextIteration) {
    nextIteration = false;
    for (let i = 0; i < chars.length; i++) {

      const substring = reverse
        ? finalString.slice(0, chars[i].length)
        : finalString.slice(finalString.length - chars[i].length);

      if (substring === chars[i]) {
        finalString = reverse
          ? finalString.slice(chars[i].length, finalString.length)
          : finalString = finalString.slice(0, finalString.length - chars[i].length);

        nextIteration = true;
      }
    }
  }

  return finalString;
}


// clamps string
function clamp(text, coeff, splitter = '', reverse = false) {

  const textChunks = String(text).split(splitter);
  const sliceIndx = Math.floor(textChunks.length * coeff);
  if (sliceIndx < 1) {
    return '';
  }

  const clampedTextChunks = reverse
    ? textChunks.slice(-sliceIndx)
    : textChunks.slice(0, sliceIndx);

  return clampedTextChunks.join(splitter);
}


// returns copy of a DOM-element
function createSimilarEl(sample, styles = {}) {
  const element = document.createElement(sample.tagName);
  const sampleStylesText = window.getComputedStyle(sample).cssText;

  element.style.cssText = sampleStylesText;
  for (const property in styles) {
    element.style[property] = styles[property];
  }
  return element;
}


// Adds ellipsis & prefix to string
function constructString(str = '', ellipsis = '', prefix = '', reverse = false) {
  if (str === '') {
    return '';
  }
  return reverse
    ? `${ellipsis}${str}${prefix}`
    : `${prefix}${str}${ellipsis}`;
}


// normalize param
function normalizeValue(value, rule = 'number') {
  switch (rule) {
    case 'number':
      if (!parseFloat(value)) {
        return NaN;
      }
      return Number(value);
    default:
      return value;
  }
}


// normalize arguments types
function normalizeObj(obj) {
  const normalizedObj = { ...obj };
  const keys = Object.keys(normalizedObj);

  for (const key in keys) {
    normalizedObj[keys[key]] = normalizeValue(normalizedObj[keys[key]]);
  }
  return normalizedObj;
}


function clampLines(
  srcStr = '', srcElement = 'div', srcLines = 1, srcEllipsis = '...', srcSplitter = ' ',
  srcPunctuation = [
    ',', '/', '\\', '&', '.', '-', '!', '?', ' ', ';', ':',
    String.fromCharCode(13), String.fromCharCode(10), String.fromCharCode(9)
  ],
  srcGap = 0.01, srcReverse = false, srcPunctuationAdditional = []
) {
  let str, element, lines, ellipsis, splitter,
    punctuation, gap, reverse, punctuationChars;

  if (srcStr === undefined) {
    console.error('React-string-clamp error: string is undefined!');
    return;
  }
  if (typeof srcStr !== 'string' && typeof srcStr !== 'number') {
    console.error(
      `React-string-clamp error: string type is ${typeof srcStr}. Expected string or number.`
    );
    return;
  }

  return clampLinesKernel(
    str, element, lines, ellipsis, splitter,
    punctuation, gap, reverse, punctuationChars
  );
}


// returns clamped string for a DOM-element
function clampLinesKernel(text, element, {
  lines, ellipsis, splitter, punctuation, gap, reverse, prefix, punctuationChars
}) {

  const maxHeight = 3 * Number(lines);
  const testEl = createSimilarEl(element, {
    lineHeight: `${3}px`, height: 'auto',
    position: 'absolute', opacity: '0', left: '-9999px',
    width: `${element.clientWidth * (1 - Number(gap))}px`,
    paddingTop: 0, paddingBottom: 0
  });
  element.appendChild(testEl);

  let clampedText = text;
  testEl.innerHTML = constructString(clampedText, ellipsis, prefix, reverse);

  let testElHeight = testEl.clientHeight;
  if (testElHeight <= maxHeight) {
    testEl.remove();
    return clampedText;
  }

  let decrementCoeff = (maxHeight / testElHeight) + 0.35;
  while (testElHeight > maxHeight && clampedText.length) {
    clampedText = clamp(text, decrementCoeff, splitter, reverse);
    clampedText = punctuation ? delLastChars(clampedText, punctuationChars, reverse) : clampedText;

    testEl.innerHTML = constructString(clampedText, ellipsis, prefix, reverse);
    testElHeight = testEl.clientHeight;
    decrementCoeff -= 0.025;
  }

  testEl.remove();
  clampedText = punctuation
    ? delLastChars(clampedText, punctuationChars, reverse)
    : clampedText;
  return constructString(clampedText, ellipsis, prefix, reverse);
}

module.exports = {
  delLastChars, clamp, clampLines, createSimilarEl, constructString,
  normalizeObj, normalizeValue
};