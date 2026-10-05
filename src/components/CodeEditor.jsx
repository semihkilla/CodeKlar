import { useRef } from "react";

export function Highlight({ code }) {
  const tokens = code.split(
    /(\/\/[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:const|let|var|function|return|if|else|true|false|null|new|class|int|String|void)\b|\b\d+\b|=>|===|&&|\b(?:map|filter|includes|slice|log|equals|append)\b)/g,
  );
  return tokens.map((token, index) => {
    let type = "";
    if (token.startsWith("//")) type = "comment";
    else if (/^["']/.test(token)) type = "string";
    else if (/^\d+$/.test(token)) type = "number";
    else if (/^(map|filter|includes|slice|log|equals|append)$/.test(token))
      type = "method";
    else if (
      /^(const|let|var|function|return|if|else|true|false|null|new|class|int|String|void|=>|===|&&)$/.test(
        token,
      )
    )
      type = "keyword";
    return (
      <span key={index} className={type ? `token-${type}` : undefined}>
        {token}
      </span>
    );
  });
}

export function CodeEditor({
  code,
  setCode,
  onRun,
  readonly = false,
  language = "JavaScript",
}) {
  const highlighted = useRef(null);
  const numbers = useRef(null);
  function handleKey(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      onRun?.();
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.currentTarget;
      setCode(code.slice(0, selectionStart) + "  " + code.slice(selectionEnd));
      const target = event.currentTarget;
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = selectionStart + 2;
      });
    }
  }
  return (
    <div className={`code-editor ${readonly ? "read-only" : ""}`}>
      <div className="line-numbers" ref={numbers} aria-hidden="true">
        {code.split("\n").map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="code-content">
        <pre
          className="highlighted-code"
          ref={highlighted}
          aria-hidden={!readonly}
        >
          <Highlight code={code + "\n"} />
        </pre>
        {!readonly && (
          <textarea
            aria-label={`${language}-Code`}
            value={code}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={handleKey}
            onScroll={(event) => {
              highlighted.current.scrollTop = event.target.scrollTop;
              highlighted.current.scrollLeft = event.target.scrollLeft;
              numbers.current.scrollTop = event.target.scrollTop;
            }}
          />
        )}
      </div>
    </div>
  );
}
