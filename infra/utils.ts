export const makeResourceName = (name: string) => {
  return `${$app.stage}-${name}`;
};
