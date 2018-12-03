import * as functions from 'firebase-functions'
import * as sanitizeHtml from 'sanitize-html'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const sanitize = functions.https.onCall((data, context) => {
  const text = data.text
  const sanitizedText = sanitizeHtml(text, {
    allowedTags: [
      'html', 'head', 'title', 'meta', 'link', 'body', 'style', 'section', 'article',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe',
    ],
    allowedAttributes: {
      '*': ['class', 'id', 'style'],
      'meta': ['*'],
      'link': ['*'],
      'a': ['href', 'name', 'target'],
      'img': ['src'],
    },
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
    allowedSchemes: ['https'],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
    allowProtocolRelative: true,
  })
  return {
    sanitizedText,
  }
})
