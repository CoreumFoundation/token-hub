export const convertEditorsToDataEditors = (editors: string[]) => {
  return editors.map((item: string) => {
    switch (item) {
    case 'admin':
      return 0;
    case 'owner':
      return 1;
    default:
      return -1;
    }
  });
};
