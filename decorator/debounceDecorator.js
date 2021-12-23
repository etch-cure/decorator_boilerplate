export default function debounceDecorator(delay = 500) {
  return (target, key, descriptor) => {
    let timeout;
    let method = descriptor.value;
    descriptor.value = function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => method.apply(this, arguments), delay)
    }
  }
}