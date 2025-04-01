export const displayableWear = (wear: number) => {
  if (wear < 40) {
    return { text: "None", color: "#66f29c" };
  } else if (wear < 200) {
    return { text: "Low", color: "#79f266" };
  } else if (wear < 400) {
    return { text: "Moderate", color: "#e9f266" };
  } else if (wear < 700) {
    return { text: "High", color: "#f2aa66" };
  } else {
    return { text: "Very High", color: "#f26666" };
  }
};
