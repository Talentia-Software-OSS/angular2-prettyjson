// Taken from github.com/isaacs/json-stringify-safe
export function serializer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stack: any[] = [];
  const keys: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cycleReplacer = function(key: string, value: any) {
    if (stack[0] === value) {
      return "[Circular ~]";
    }
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(this: any, key: string, value: any) {
    if (stack.length > 0) {
      const thisPos = stack.indexOf(this);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
      if (~stack.indexOf(value)) {
        value = cycleReplacer.call(this, key, value);
      }
    } else {
      stack.push(value);
    }

    return value;
  };
}
