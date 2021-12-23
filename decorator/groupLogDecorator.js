export default function groupLogDecorator (target, key, descriptor) {
  let method = descriptor.value;
  descriptor.value = function () {
    const funcName = method.name ?? '';
    console.group(funcName + '함수가 시작됩니다.');
    const result = method.apply(this, arguments);
    console.groupEnd();
    return result;
  }
}