import { useState } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'

export default function EditPage() {
  const [code, setCode] = useState(`<h1>Hi!</h1>`)
  const [savedStatus, setSavedStatus] = useState(true)
  return (
    <>
      <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid' }}>
        <Editor
          highlight={code => highlight(code, languages['markup'])}
          value={code}
          onValueChange={theCode => {
            setSavedStatus(false)
            setCode(theCode)
          }}
          padding={10}
          preClassName="language-markup"
          style={{
            fontSize: 16,
            color: '#c5c8c6',
            background: 'black',
            height: '100vh',
            overflow: 'scroll',
            maxWidth: '50vw',
            lineHeight: '1.5',
            fontFamily: 'Inconsolata',
          }}
        />
        <iframe srcDoc={`${code}`} />
      </div>
      <div
        style={{
          background: savedStatus ? '#0072ce' : '#3F2021',
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          color: 'white',
          padding: '5px 12px 5px 12px',
          paddingBottom: '5px',
          borderRadius: '8px',
          fontFamily: "'EB Garamond'",
          cursor: 'pointer',
        }}
        onClick={() => {
          setSavedStatus(true)
        }}
      >
        {savedStatus ? 'Saved in the cloud!' : 'Save contents!'}
      </div>
      <style>{`
      code[class*="language-"],
      pre[class*="language-"] {
        color: #c5c8c6;
        text-shadow: 0 1px rgba(0, 0, 0, 0.3);
        font-family: Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace!important;
        direction: ltr;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        line-height: 1.5;

        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;

        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
      }

      iframe {
        border: none;
        height: 100vh;
        width: 50vw;
      }

      /* Code blocks */
      pre[class*="language-"] {
        padding: 1em;
        margin: .5em 0;
        overflow: auto;
        border-radius: 0.3em;
      }

      :not(pre) > code[class*="language-"],
      pre[class*="language-"] {
        background: #1d1f21;
      }

      /* Inline code */
      :not(pre) > code[class*="language-"] {
        padding: .1em;
        border-radius: .3em;
      }

      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: #7C7C7C;
      }

      .token.punctuation {
        color: #c5c8c6;
      }

      .namespace {
        opacity: .7;
      }

      .token.property,
      .token.keyword,
      .token.tag {
        color: #96CBFE;
      }

      .token.class-name {
        color: #FFFFB6;
        text-decoration: underline;
      }

      .token.boolean,
      .token.constant {
        color: #99CC99;
      }

      .token.symbol,
      .token.deleted {
        color: #f92672;
      }

      .token.number {
        color: #FF73FD;
      }

      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin,
      .token.inserted {
        color: #A8FF60;
      }

      .token.variable {
        color: #C6C5FE;
      }

      .token.operator {
        color: #EDEDED;
      }

      .token.entity {
        color: #FFFFB6;
        cursor: help;
      }

      .token.url {
        color: #96CBFE;
      }

      .language-css .token.string,
      .style .token.string {
        color: #87C38A;
      }

      .token.atrule,
      .token.attr-value {
        color: #F9EE98;
      }

      .token.function {
        color: #DAD085;
      }

      .token.regex {
        color: #E9C062;
      }

      .token.important {
        color: #fd971f;
      }

      .token.important,
      .token.bold {
        font-weight: bold;
      }

      .token.italic {
        font-style: italic;
      }
    `}</style>
    </>
  )
}
