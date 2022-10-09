export const getDocId = (now: Date) => {
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

const getTodayDocId = () => {
  return getDocId(new Date());
};

export default getTodayDocId;
