/* eslint-disable no-restricted-syntax */
// export const shallowDiffers = (a, b) => {
//   for (const i in a) if (!(i in b)) return true;
//   for (const i in b) if (a[i] !== b[i]) return true;
//
//   return false;
// };
//
// export default (instance, nextProps, nextState) => {
//   return (
//     shallowDiffers(instance.props, nextProps) ||
//     shallowDiffers(instance.state, nextState)
//   );
// };


/* eslint-disable no-restricted-syntax */
export const shallowEqual = (a, b) => {
  if (a === b) {
    return true;
  }

  if (typeof a !== 'object' || a === null
      || typeof b !== 'object' || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const bHasOwnProperty = hasOwnProperty.bind(b);
  for (let i = 0; i < keysA.length; i += 1) {
    if (!bHasOwnProperty(keysA[i]) || a[keysA[i]] !== b[keysA[i]]) {
      return false;
    }
  }

  return true;
};

export default (instance, nextProps, nextState) => {
  return (
    !shallowEqual(instance.props, nextProps)
    || !shallowEqual(instance.state, nextState)
  );
};
