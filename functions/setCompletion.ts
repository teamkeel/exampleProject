import { SetCompletion } from "@teamkeel/sdk";

export default SetCompletion(async (inputs, api) => {
  const now = new Date();
  return api.models.todo.update(inputs.where.id, {
    ...inputs.values,
    completedAt: inputs.values.complete ? now : null,
  });
});
