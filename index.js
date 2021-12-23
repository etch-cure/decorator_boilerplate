import baseWrapDecorator, { baseArgWrapDecorator } from "./decorator/baseWrapDecorator";
import debounceDecorator from "./decorator/debounceDecorator";
import delayingDecorator from "./decorator/delayingDecorator";
import groupLogDecorator from "./decorator/groupLogDecorator";
import spyDecorator from "./decorator/spyDecorator";
import throttleDecorator from "./decorator/throttleDecorator";

export {
  debounceDecorator as debounce,
  delayingDecorator as delay,
  groupLogDecorator as groupLog,
  spyDecorator as spy,
  throttleDecorator as throttle,
}