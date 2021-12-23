import baseWrapDecorator, { baseArgWrapDecorator } from "../decorator/baseWrapDecorator";

describe("baseWrap", function() {
  afterEach(() => {    
    jest.clearAllMocks();
  });

  it("argument test", function() {
    class Test {
      @baseWrapDecorator
      static func(a, b) {
        return a + b;
      }
    }

    expect(Test.func(1, 2)).toBe(3);
  });

  it("keep context test", function() {
    class Test {
      @baseWrapDecorator
      static func() {
        expect(this).toEqual(Test);
      }
    }
    
    Test.func();
  });

  it("argument method decorator", function() {
    class Test {
      @baseArgWrapDecorator(1000)
      static func() {
      }
    }
    
    const spyLogFunc = jest.spyOn(console, "log");
    Test.func();
    expect(spyLogFunc).toHaveBeenLastCalledWith('decorator argument: ', 1000);
  });
});