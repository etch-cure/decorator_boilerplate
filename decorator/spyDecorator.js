export default function spyDecorator (target, key, descriptor) {
  let method = descriptor.value;
  function spy () {
    const arg = [].slice.call(arguments)
    spy.calls.push(arg);
    return method.apply(this, arg);
  }
  spy.calls = []
  descriptor.value = spy
}