/* eslint-disable space-in-parens */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable padded-blocks */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-undef */
const todoList = require("../todo");
const oneDay = 60 * 60 * 24 * 1000;
const today = new Date();

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("todoList", () => {
  beforeAll(() => {
    // Initialize today globally
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date(today.getTime() - 1 * oneDay).toLocaleDateString(
        "en-CA",
      ),
    });
    add({
      title: "Test todo2",
      completed: false,
      dueDate: new Date(today.getTime() + 1 * oneDay).toLocaleDateString(
        "en-CA",
      ),
    });
    add({
      title: "Test todo3",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should return a list of overdue todos", () => {
    const overDueTodoItemsCount = overdue().length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date(today.getTime() - 1 * oneDay).toLocaleDateString(
        "en-CA",
      ),
    });
    expect(overdue().length).toEqual(overDueTodoItemsCount + 1);
  });

  test("Should return a list of todos due today", () => {
    const duetodayTodoItemsCount = dueToday().length;
    add({
      title: "Test todo3",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(dueToday().length).toEqual(duetodayTodoItemsCount + 1);
  });

  test("Should return a list of todos due later", () => {
    const dueLaterTodoItemsCount = dueLater().length;
    add({
      title: "Test todo2",
      completed: false,
      dueDate: new Date(today.getTime() + 2 * oneDay)
        .toISOString()
        .slice(0, 10),
    });
    expect(dueLater().length).toEqual(dueLaterTodoItemsCount + 1);
  });
});
