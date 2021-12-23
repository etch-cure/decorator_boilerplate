import spyDecorator from "../decorator/spyDecorator";

describe("spy", function() {
  afterEach(() => {    
    jest.clearAllMocks();
  });

  it("records calls into its property", function() {
    class spyTest {
      @spyDecorator
      static work(a, b) {
        console.log( a + b ); // work is an arbitrary function or method
      }
    }
    
    expect(spyTest.work.calls).toEqual([]);

    spyTest.work(1, 2);
    expect(spyTest.work.calls).toEqual([
      [1, 2]
    ]);

    spyTest.work(3, 4);
    expect(spyTest.work.calls).toEqual([
      [1, 2],
      [3, 4]
    ]);
  });

  it("transparently wraps functions", function() {

    class spyTest {
      @spyDecorator
      static sum(a, b) {
        return a + b;
      }
    }

    expect(spyTest.sum(1, 2)).toBe(3);
  });


  it("transparently wraps methods", function() {

    class spyTest {
      @spyDecorator
      sum(a, b) {
        return a + b;
      }
    }

    let calc = new spyTest();
    expect(calc.sum(5, calc.sum(1, 2))).toBe(8);
  });

});