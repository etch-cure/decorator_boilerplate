import throttleDecorator from "../decorator/throttleDecorator"

jest.useFakeTimers(); // 네이티브 타이머를 Jest 타이머로 대체

describe("throttle", function() {
  afterEach(() => {    
    jest.clearAllMocks();
  });

  it("the first call runs now", function() {
    class Test {
      @throttleDecorator()
      static throttleFunc(arg) {
        console.log('throttle call with: ', arg)
      }
    }
    
    const spyFunc = jest.spyOn(Test, "throttleFunc");
    const spyLogFunc = jest.spyOn(console, "log");

    Test.throttleFunc(1);
    expect(spyFunc).toHaveBeenCalledTimes(1);
    expect(spyLogFunc).toHaveBeenLastCalledWith('throttle call with: ', 1);
  });

  it("then calls are ignored till 1000ms when the last call works", function() {
    class Test {
      @throttleDecorator(1000)
      static throttleFunc(a) {
        console.log('throttle call with: ', a);
      }
    }
    
    const spyFunc = jest.spyOn(Test, "throttleFunc");
    const spyLogFunc = jest.spyOn(console, "log");

    Test.throttleFunc(1);
    Test.throttleFunc(2);
    Test.throttleFunc(3);

    expect(spyFunc).toHaveBeenCalledTimes(3);
    expect(spyLogFunc).toHaveBeenLastCalledWith('throttle call with: ', 1);
    jest.advanceTimersByTime(1000);
    expect(spyLogFunc).toHaveBeenCalledTimes(2);
    expect(spyLogFunc).toHaveBeenLastCalledWith('throttle call with: ', 3);
  });

  it("the third call waits 1000ms after the second call", function() {
    class Test {
      @throttleDecorator(1000)
      static throttleFunc(a) {
        console.log('throttle call with: ', a);
      }
    }
    
    const spyFunc = jest.spyOn(Test, "throttleFunc");
    const spyLogFunc = jest.spyOn(console, "log");

    Test.throttleFunc(1);
    jest.advanceTimersByTime(100);
    Test.throttleFunc(2);
    jest.advanceTimersByTime(100);
    Test.throttleFunc(3);
    jest.advanceTimersByTime(100);
    Test.throttleFunc(4);
    jest.advanceTimersByTime(700);

    expect(spyFunc).toHaveBeenCalledTimes(4);
    expect(spyLogFunc).toHaveBeenCalledTimes(2);
    expect(spyLogFunc).toHaveBeenLastCalledWith('throttle call with: ', 4);
  });
});