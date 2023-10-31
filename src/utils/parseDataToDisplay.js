const parseDataToDisplay = (arr) => {
  const dataElementsToKeep = [0, 4, 5, 8, 9];
  return dataElementsToKeep.map((index) => arr[index]);
};

export default parseDataToDisplay;
