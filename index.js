async function getData(url = "./data.json") {
  const response = await fetch(url);
  return response.json();
}

const data = await getData();

let max = 0;
for (let item of data) {
  if (item.amount > max) {
    max = item.amount;
  }
}

const getHeight = (amount, max) => {
  const COLUMN_MAX_HEIGHT = 140;
  return (Number(amount) / Number(max)) * COLUMN_MAX_HEIGHT;
};

const chart = document.querySelector(".chart");

for (let item of data) {
  let li = document.createElement("li");
  let div = document.createElement("div");
  let p = document.createElement("p");

  li.className = "chart__item";
  div.className = "chart__column";
  p.className = "chart__label";

  p.innerText = item.day;
  div.style.height = `${getHeight(item.amount, max)}px`;
  if (item.amount == max) {
    div.classList.add("chart__column--tallest");
  }

  li.append(div);
  li.append(p);
  chart.append(li);
}
