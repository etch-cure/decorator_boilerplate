export default function throttleDecorator (delay = 500) {
  return (target, key, descriptor) => {
    let method = descriptor.value;
    let isThrottled = false,
        savedArgs,
        savedThis;
    descriptor.value = function () {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      method.apply(this, arguments);

      isThrottled = true;

      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          method.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, delay);
    }
  }
}
