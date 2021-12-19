import collections from "../components/collections.js";
import allSmallCases from "../components/allSmallcases.js";
import getData from "./getData.js";
import managers from "../components/managers.js";
import navbar from "../components/navbar.js";

import {
  totalfilters,
  subTypeFilter,
  investmentAmountFilter,
  volatilityFilter,
  strategyFilter,
} from "../components/sidebar..js";

const mainDiv = document.getElementById("main");
let allNavli = document
  .querySelector(".discover-nav")
  .querySelector(".left")
  .querySelectorAll("li");

allNavli.forEach((e) => {
  e.addEventListener("click", () => {
    allNavli.forEach((el) => {
      el.className = "";
    });
    e.className = "link-active";
    showPage(e.firstChild.textContent, mainDiv);
    console.log(e.firstChild.textContent);
  });
});

function showPage(name, div) {
  div.innerHTML = null;
  if (name == "Collections") {
    div.innerHTML = collections();
  } else if (name == "All smallcases") {
    div.innerHTML = allSmallCases();
    const sidebarDiv = document.querySelector(".sidebar");
    sidebarDiv.innerHTML =
      totalfilters() +
      subTypeFilter() +
      investmentAmountFilter() +
      volatilityFilter() +
      strategyFilter();

    const smListDiv = document.querySelector(".smallcases-list");
    console.log(smListDiv.innerHTML);
    let res = getData("http://localhost:5000/api/smallcases");
    res.then((data) => {
      appendAllSmallcases(data, smListDiv);
      handleFilters(smListDiv);
    });
  } else if (name == "Managers") {
    div.innerHTML = managers();
    const sidebarDiv = document.querySelector(".sidebar");
    sidebarDiv.innerHTML = totalfilters() + strategyFilter();

    let res = getData("http://localhost:5000/api/managers");

    res.then((data) => {
      const mnListDiv = document.querySelector(".managers-list");
      appendManagers(data, mnListDiv);
    });
  }
}

async function appendAllSmallcases(data, div) {
  let managerRes = await getData(`http://localhost:5000/api/managers`);

  div.innerHTML = null;

  data.forEach((smlcase) => {
    let managerName = managerRes.filter((e) => {
      return smlcase.managerId == e.id;
    });

    let listItemDiv = document.createElement("div");
    listItemDiv.className = "list-item";

    listItemDiv.addEventListener("click", () => {
      window.location.href = `smallcase.html?id=${smlcase.id}`;
    });

    let itemImgDiv = document.createElement("img");
    itemImgDiv.src = smlcase.image;

    let contentDiv = document.createElement("div");
    contentDiv.className = "content";

    let contentH2 = document.createElement("h2");
    contentH2.textContent = smlcase.name;

    let contentp1 = document.createElement("p");
    contentp1.textContent = smlcase.overview;

    let contentp2 = document.createElement("p");
    contentp2.textContent = "By " + managerName[0].name;

    contentDiv.append(contentH2, contentp1, contentp2);

    let minAmountDiv = document.createElement("div");
    minAmountDiv.className = "min-amount";

    let minAmountP1 = document.createElement("p");
    minAmountP1.textContent = "Min. Amount";

    let minAmountP2 = document.createElement("p");
    minAmountP2.textContent = "₹ " + smlcase.minInvestment;

    minAmountDiv.append(minAmountP1, minAmountP2);

    let returnsDiv = document.createElement("div");
    returnsDiv.className = "returns";

    let returnsP1 = document.createElement("p");
    returnsP1.textContent = "3Y CAGR";

    let returnsP2 = document.createElement("p");
    returnsP2.textContent = "25%";

    returnsDiv.append(returnsP1, returnsP2);

    let volatilityDiv = document.createElement("div");
    volatilityDiv.className = "volatility";
    volatilityDiv.textContent = smlcase.volatility + " Volatility";

    listItemDiv.append(
      itemImgDiv,
      contentDiv,
      minAmountDiv,
      returnsDiv,
      volatilityDiv
    );

    div.append(listItemDiv);
  });
}

function appendManagers(data, div) {
  div.innerHTML = null;
  data.forEach((mn) => {
    let mnListItemDiv = document.createElement("div");
    mnListItemDiv.className = "managers-list-item";

    mnListItemDiv.addEventListener("click", () => {
      window.location.href = `manager.html?id=${mn.id}`;
    });

    let mnDetailsDiv = document.createElement("div");
    mnDetailsDiv.className = "manager-details";

    let mnDetalilsD1 = document.createElement("div");

    let mnDetailsH2 = document.createElement("h2");
    mnDetailsH2.textContent = mn.name;

    let mnDetailsTotal = document.createElement("div");
    mnDetailsTotal.textContent = "Manages 27 smallcases";

    mnDetalilsD1.append(mnDetailsH2, mnDetailsTotal);

    let mnDetailsImg = document.createElement("img");
    mnDetailsImg.src = mn.image;

    mnDetailsDiv.append(mnDetalilsD1, mnDetailsImg);

    let mnOverviewDiv = document.createElement("div");
    mnOverviewDiv.className = "manager-overview";

    let mnOverviewP = document.createElement("p");
    mnOverviewP.textContent = mn.overview;

    mnOverviewDiv.append(mnOverviewP);

    let mnStrategiesDiv = document.createElement("div");
    mnStrategiesDiv.className = "manager-strategies";

    let mnStrategiesSpan1 = document.createElement("span");
    mnStrategiesSpan1.textContent = mn.categories[0];

    let mnStrategiesSpan2 = document.createElement("span");
    mnStrategiesSpan2.textContent = mn.categories[1];

    mnStrategiesDiv.append(mnStrategiesSpan1, mnStrategiesSpan2, " +12 more");

    mnListItemDiv.append(mnDetailsDiv, mnOverviewDiv, mnStrategiesDiv);
    div.append(mnListItemDiv);
  });
}

function handleFilters(div) {
  let subTypeSpans = document
    .querySelector(".sub-type")
    .querySelector("div")
    .querySelectorAll("span");

  subTypeSpans.forEach((e) => {
    e.addEventListener("click", () => {
      subTypeSpans.forEach((el) => {
        el.className = null;
      });
      let url = "http://localhost:5000/api/smallcases";
      if (e.textContent == "Free Access") {
        url = "http://localhost:5000/api/smallcases?subType_like=free+access";
      }

      let res = getData(url);
      res.then((data) => {
        console.log(data);
        appendAllSmallcases(data, div);
      });
      e.className = "sub-type-active";
    });
  });
}

mainDiv.innerHTML = mainDiv.innerHTML = collections();

const navbarDiv = document.getElementById("section-navbar");
navbarDiv.innerHTML = navbar();
