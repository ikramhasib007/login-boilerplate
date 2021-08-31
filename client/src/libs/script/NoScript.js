export default ({children}) => (
  <noscript dangerouslySetInnerHTML={{__html: `(${children.toString()})();` }}></noscript>
);