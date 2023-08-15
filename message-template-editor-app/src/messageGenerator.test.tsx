import { messageGenerator } from "./utils/utils";

const data = {
  id: null,
  children: null,
  parentId: null,
  text: { value: "Hello" },
  type: "TEXT",
};
const mapState = new Map();

[
  { variable: "firstname", value: "" },
  { variable: "lastname", value: "" },
  { variable: "company", value: "" },
  { variable: "position", value: "" },
].forEach((item) => {
  mapState.set(item.variable, item.value);
});

describe("function messageGenerator tests", () => {
  test("messageGenerator function should be called", () => {
    const mockedMessageGenerator = jest.fn(messageGenerator);
    mockedMessageGenerator(data, mapState);
    expect(mockedMessageGenerator).toHaveBeenCalled();
  });

  test("messageGenerator function successfully returned", () => {
    const mockedMessageGenerator = jest.fn(messageGenerator);
    mockedMessageGenerator(data, mapState);
    expect(mockedMessageGenerator).toHaveReturned();
  });

  test("messageGenerator function should be called with data and mapState", () => {
    const mockedMessageGenerator = jest.fn(messageGenerator);
    mockedMessageGenerator(data, mapState);
    expect(mockedMessageGenerator).toHaveBeenCalledWith(data, mapState);
  });

  test("messageGenerator function should be return a value of type string", async () => {
    const mockedMessageGenerator = jest.fn(() =>
      Promise.resolve(messageGenerator(data, mapState))
    );
    const result = await mockedMessageGenerator();
    expect(typeof result).toBe("string");
  });

  test("messageGenerator function should return the correct given value", async () => {
    const mockedMessageGenerator = jest.fn(() =>
      Promise.resolve(messageGenerator(data, mapState))
    );
    const result = await mockedMessageGenerator();
    expect(result).toBe("Hello");
  });
});
