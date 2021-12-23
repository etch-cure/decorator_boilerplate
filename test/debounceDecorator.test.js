import debounceDecorator from "../decorator/debounceDecorator";

jest.useFakeTimers(); // 네이티브 타이머를 Jest 타이머로 대체

describe("debounce", function() {
  afterEach(() => {    
    jest.clearAllMocks();
  });

  it("for one call - runs it after given ms", function() {
    class Test {
      @debounceDecorator()
      static debouncFunc(func) {
        return func();
      }
    }
    
    const spyFunc = jest.spyOn(Test, "debouncFunc");
    const mockCallback = jest.fn(() => 1);

    Test.debouncFunc(mockCallback);

    expect(spyFunc).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls.length).toBe(0);

    jest.advanceTimersByTime(500);
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it("for 3 calls - runs the last one after given ms", function() {
    class Test {
      @debounceDecorator(1000)
      static debouncFunc(a) {
        console.log('debounce call with: ', a);
      }
    }
    
    const spyFunc = jest.spyOn(Test, "debouncFunc");
    const spyLogFunc = jest.spyOn(console, "log");

    Test.debouncFunc('a');
    setTimeout(() => Test.debouncFunc('b'), 200); // ignored (too early)
    setTimeout(() => Test.debouncFunc('c'), 500); // runs (1000 ms passed)

    jest.advanceTimersByTime(1000);
    expect(spyFunc).toHaveBeenCalledTimes(3);
    expect(spyLogFunc).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(500);
    expect(spyLogFunc).toHaveBeenLastCalledWith('debounce call with: ', 'c');
  });
});