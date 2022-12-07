import { test, expect, Todo, actions } from "@teamkeel/testing";

test("todo creation", async () => {
  const { object } = await Todo.create({
    title: "Test todo",
    complete: false,
  });

  expect(object).notToBeEmpty();
  expect(object!.complete).toEqual(false);
});

test("set completion date", async () => {
  const { object: todo } = await Todo.create({
    title: "Test todo",
    complete: false,
  });

  expect(todo).notToBeEmpty();
  expect(todo!.complete).toEqual(false);
  expect(todo!.completedAt).toBeEmpty();

  const { object: result } = await actions.setCompletion({
    where: { id: todo.id },
    values: { complete: true },
  });

  expect(result!.complete).toEqual(true);
  expect(result!.completedAt).notToBeEmpty();
});
