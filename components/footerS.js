function smallFooter() {
  return `  

    <div id="smallFooter">
      <div id="upPart">
        <div class="Fcolor">
          © Powered by smallcase Technologies Pvt. Ltd. Email us at
          <span>support@upstox.com</span>
        </div>
        <div id="myOptions">
          <div>Help</div>
          <div>Disclosures</div>
          <div>More ^</div>
        </div>
      </div>
      <div id="downPart">
        <div>
          <img
            id="upstoxLogo"
            src="../images/logo.svg"
            alt=""
          />
          <p class="Fcolor">NSE & BSE - SEBI Registration No: INZ000185137</p>
        </div>
        <div>
          <img
            id="secure"
            src="https://assets.smallcase.com/images/brokers/upstox/secure.png"
            alt=""
          />
        </div>
      </div>
    </div>`;
}
// export default smallFooter;

function upperPart() {
  return `<div id="myBody">
  <div id="body1">
    <div id="overview">
      <h1>Overview</h1>
      <p>Markets & your investments</p>
    </div>
    <div id="niftyH">
      <h3 class="nifty">NIFTY</h3>
      <h4 id="rate">
        17,245.80
        <i class="fa fa-caret-down" style="font-size: 26px; color: red"></i>
          <span id="percentage"> 0.70%</span>
        </i>
      </h4>
    </div>
    <div>
      <h3 class="nifty">Current Value</h3>
      <h1>-</h1>
    </div>
    <div>
      <h3 class="nifty">Current Returns</h3>
      <h1>-</h1>
    </div>
    <div id="discoverbtn">
      <button id="discoverbutton">Discover smallcases</button>
    </div>
  </div>
</div>`;
}

export { smallFooter, upperPart };
