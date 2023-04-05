import { SetCompletion, Todo } from "@teamkeel/sdk";

export default SetCompletion(async (inputs, api, ctx) => {
  const now = new Date();
  
  const todo = await api.models.todo.findOne(inputs.where);

  if (todo && todo.ownerId == ctx.identity?.id) {
    api.permissions.allow();
  } else {
    api.permissions.deny();
  }

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
