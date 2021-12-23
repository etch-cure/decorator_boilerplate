export default function delayingDecorator (delay = 500) {
  return (target, key, descriptor) => {
    let method = descriptor.value;
    descriptor.value = function () {
      setTimeout(() => method.apply(this, arguments), delay)
    }
  }
}
