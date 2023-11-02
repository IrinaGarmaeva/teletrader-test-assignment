// for table in Home page 
export const parseDataToDisplay = (arr) => {
  const dataElementsToKeep = [0, 4, 5, 8, 9];
  return dataElementsToKeep.map((index) => arr[index]);
};


