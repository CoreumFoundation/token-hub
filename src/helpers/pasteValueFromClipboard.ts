export const pasteValueFromClipboard = async (callbackFunction: Function) => {
  try {
    const clipboardText = await navigator.clipboard.readText();

    callbackFunction(clipboardText);
  } catch (error) {
    console.log(error);
  }
};
