export default function baseWrapDecorator (target, key, descriptor) {
  let method = descriptor.value;
  descriptor.value = function () {
    return method.apply(this, arguments);
  }
}

export function baseArgWrapDecorator (arg = 500) {
  return (target, key, descriptor) => {
    let method = descriptor.value;
    descriptor.value = function () {
      console.log('decorator argument: ', arg);
      return method.apply(this, arguments);
    }
  }
}
