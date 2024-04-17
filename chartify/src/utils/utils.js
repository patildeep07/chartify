export const getTime = (input) => {
  const dateArray = input.split("/");
  const dateTime = new Date(
    `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
  ).getTime();
  return dateTime;
};
