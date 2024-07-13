const { useRef, useEffect } = require("react");

const areEqual = (a, b) => {
  if (a === null) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

const useCustomMemo = (callback, deps) => {
  // variable or state -> cached value
  const memoizedRef = useRef();
  //   Changes in deps
  if (!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)) {
    memoizedRef.current = {
      value: callback(),
      deps,
    };
  }
  // add cleanup logic
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  // return the memoized value (if any)
  return memoizedRef.current.value;
};

export default useCustomMemo;
