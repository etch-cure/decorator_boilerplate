import delayingDecorator from "../decorator/delayingDecorator";

jest.useFakeTimers(); // 네이티브 타이머를 Jest 타이머로 대체

describe("delay", function() {
  afterEach(() => {    
    jest.clearAllMocks();
  });

  it("calls the function after the default timeout", function() {
    class delayingTest {
      @delayingDecorator()
      static delayFunc(func) {
        return func();
      }
    }
    
    const spyDelayFunc = jest.spyOn(delayingTest, "delayFunc");
    jest.spyOn(global, "setTimeout")
    const mockCallback = jest.fn(() => 1);

    delayingTest.delayFunc(mockCallback);

    expect(spyDelayFunc).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls.length).toBe(0);

    jest.advanceTimersByTime(500);
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });

  it("calls the function after the specified timeout", function() {
    class delayingTest {
      @delayingDecorator(1000)
      static delayFunc(f) {
        return f();
      }
    }
    
    const spyDelayFunc = jest.spyOn(delayingTest, "delayFunc");
    const mockCallback = jest.fn(() => 1);
    jest.spyOn(global, "setTimeout")

    delayingTest.delayFunc(mockCallback);
    expect(spyDelayFunc).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});