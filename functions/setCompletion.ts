import { SetCompletion, Todo } from "@teamkeel/sdk";

export default SetCompletion(async (inputs, api) => {
  const now = new Date();

  const values: Partial<Todo> = {
    ...inputs.values,
  };

  if (inputs.values.complete) {
    values.completedAt = now;
  }

  return api.models.todo.update(inputs.where, {
    ...values,
  });
});
