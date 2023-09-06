import { models, permissions, SetCompletion, Todo } from '@teamkeel/sdk';

export default SetCompletion({
  beforeQuery: async (ctx, inputs) => {
    const now = new Date();

    const todo = await models.todo.findOne(inputs.where);

    if (todo && todo.ownerId == ctx.identity?.id) {
      permissions.allow();
    } else {
      permissions.deny();
    }

    const values: Partial<Todo> = {
      ...inputs.values,
    };

    if (inputs.values.complete) {
      values.completedAt = now;
    }

    return models.todo.update(inputs.where, {
      ...values,
    });
  },
});
