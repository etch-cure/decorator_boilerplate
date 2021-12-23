import groupLogDecorator from "../decorator/groupLogDecorator";

describe("groupLog", function() {
  afterEach(() => {    
    jest.clearAllMocks();
  });

  it("transparently wraps functions", function() {

    class groupLogTest {
      data = 'member data'
    
      @groupLogDecorator
      aFunc(arg) {
        console.log('aFunc 실행, 매개 변수: ', arg);
        this.bFunc();
        return 1;
      }
    
      bFunc() {
        console.log('bFunc 실행, 멤버 변수: ', this.data);
      }
    }
    
    const consoleGroupSpy = jest.spyOn(console, "group")
    const consoleGroupEndSpy = jest.spyOn(console, "groupEnd")

    const testInstance = new groupLogTest();
    
    expect(testInstance.aFunc('aFunc Arg')).toBe(1);
    expect(consoleGroupSpy).toBeCalledTimes(1);
    expect(consoleGroupEndSpy).toBeCalledTimes(1);
  });
});