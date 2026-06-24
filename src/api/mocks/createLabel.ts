import { TaskLabel } from '../../shared/interfaces/tasks.interface';

let nextId = 100;

const createLabelMock = (invocation: { args?: Record<string, unknown> }): TaskLabel => {
  const labelName = (invocation.args?.labelName as string) ?? 'unnamed';
  nextId += 1;
  return { labelId: nextId, labelName };
};

export default createLabelMock;
