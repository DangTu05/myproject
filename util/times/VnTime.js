module.exports = (time) => {
  time.setHours(time.getHours() + 7);
  // Định dạng theo ISO (YYYY-MM-DD HH:mm:ss)
  const vietnamTime = time.toISOString().slice(0, 19).replace("T", " ");
  return vietnamTime;
};
