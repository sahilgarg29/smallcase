import getData from "./getData.js";
import smallcaseOverview from "../components/smallcaseOverview.js";
import smallcaseETFs from "../components/smallcaseETFs.js";
import navbar from "../components/navbar.js";
import { smallFooter, upperPart } from "../components/footerS.js";

let url = new URL(window.location.href);

const mainDiv = document.querySelector(".section-main-content");
let allNavli = document
  .querySelector(".smallcase-nav")
  .querySelector(".left")
  .querySelectorAll("li");

allNavli.forEach((e) => {
  e.addEventListener("click", () => {
    allNavli.forEach((el) => {
      el.className = "";
    });
    e.className = "link-active";
    let res = getData(
      `http://localhost:5001/api/smallcases/${url.searchParams.get("id")}`
    );

    res.then((data) => {
      console.log(data);
      showPage(e.firstChild.textContent, mainDiv, data);
      appendDataHeading(data);
    });

    console.log(e.firstChild.textContent);
  });
});

function showPage(name, div, data) {
  div.innerHTML = null;

  if (name == "Overview") {
    div.innerHTML = smallcaseOverview();
    handleTimeframes();
  } else {
    div.innerHTML = smallcaseETFs();
    appendETFs(data);
  }
}

function appendDataHeading(data) {
  const scHeadImg = document.getElementById("smallcase-thumb");
  scHeadImg.src = data.data.image_url;

  document.getElementById("smallcase-heading-name").textContent =
    data.data.name;

  if (data.subType == "paid") {
    document.getElementById("smallcase-free-access").innerHTML = null;
  }

  document.getElementById("smallcase-heading-overview").textContent =
    data.data.tagline;

  document.getElementById("smallcase-returns").textContent = "1Y CAGR";

  document.getElementById("smallcase-returns-percentage").textContent =
    data.data.returns + "%";

  document.getElementById("smallcase-vol").textContent =
    data.data.volatility + " Volatility";

  document.getElementById("smallcase-min-inves-amount").textContent =
    "₹ " + data.minimum_investment;
}

async function appendETFs(data) {
  const tableDiv = document.querySelector(".etf-table-main");
  tableDiv.innerHTML = null;
  let stocksData = await getData("http://localhost:5000/api/stocks");

  let weightArr = [];

  data.etfs.forEach((seg) => {
    let totalWeightage = 0;
    let stockDivArr = [];

    for (var i = 0; i < seg.stocks.length; i++) {
      totalWeightage += seg.stocks[i].weightage;
      let stockName = stocksData.filter((e) => {
        return seg.stocks[i].stockId == e.id;
      });

      const stockDiv = document.createElement("div");
      stockDiv.className = "etf-table-stocks";

      const stockP1 = document.createElement("p");
      stockP1.textContent = stockName[0].name;

      const stockP2 = document.createElement("p");
      stockP2.textContent = seg.stocks[i].weightage;

      stockDiv.append(stockP1, stockP2);
      stockDivArr.push(stockDiv);
    }

    weightArr.push(totalWeightage);

    const segmentDiv = document.createElement("div");
    segmentDiv.className = "etf-table-segment";

    const segmentP1 = document.createElement("p");
    segmentP1.textContent = seg.segment;

    const segmentP2 = document.createElement("p");
    segmentP2.textContent = totalWeightage.toFixed(2);

    segmentDiv.append(segmentP1, segmentP2);
    tableDiv.append(segmentDiv, ...stockDivArr);
  });

  const dt = {
    datasets: [
      {
        label: "Dataset 1",
        data: weightArr,
        backgroundColor: [
          "rgb(252, 122, 34)",
          "rgb(20, 194, 206)",
          "rgb(255, 199, 31)",
        ],
      },
    ],
  };
  const ctx = document.getElementById("pieChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "pie",
    data: dt,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Pie Chart",
        },
      },
    },
  });
}

function handleTimeframes() {
  const chartTFs = document
    .getElementById("chart-timeframes")
    .querySelectorAll("span");

  chartTFs.forEach((e) => {
    e.addEventListener("click", () => {
      chartTFs.forEach((el) => {
        el.className = null;
      });

      e.className = "active-timeframe";
    });
  });
}

function appendModalData(data) {
  document.getElementById("modal-smallcase-name").textContent = data.name;
  document.getElementById("modal-min-amount").textContent =
    "₹ " + data.minInvestment;
}

mainDiv.innerHTML = smallcaseOverview();
handleTimeframes();

let res = getData(
  `http://localhost:5001/api/smallcases/${url.searchParams.get("id")}`
);

res.then((data) => {
  console.log(data);
  appendDataHeading(data);
  function handleInvest() {
    let oneOrSip = document.querySelector(".selected").textContent;
    let quantity = document.getElementById("quantity").value;
    let amount = document.querySelector(".total-amount");
    amount.textContent = data.minimum_investment;
    console.log(oneOrSip, amount);
    closeBox();
  }
  appendModalData(data);
});

document.getElementById("button-invest-now").addEventListener("click", () => {
  console.log("clicked");
  const modalcont = document.querySelector(".modal-container");
  modalcont.removeAttribute("style");
});

let MorOBtn = document
  .getElementById("monthly-or-one")
  .querySelectorAll("span");

MorOBtn.forEach((e) => {
  e.addEventListener("click", () => {
    MorOBtn.forEach((el) => {
      el.className = "";
    });

    e.className = "selected";
  });
});

// const navbarDiv = document.getElementById("section-navbar");
// navbarDiv.innerHTML = navbar();

// const footerDiv = document.querySelector("footer");
// footerDiv.innerHTML = smallFooter();
