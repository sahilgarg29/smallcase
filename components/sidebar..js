function totalfilters() {
  return `<div class="total-filters">
  <p>Filters<span>1</span></p>
  <p class="clear-filters">Clear All</p>
</div>`;
}

function subTypeFilter() {
  return `<div class="sub-type">
  <h3>Subscription type</h3>
  <div>
    <span class="sub-type-active">All</span><span>Free Access</span>
  </div>
</div>`;
}

function investmentAmountFilter() {
  return `<div class="filter-investment-amount">
  <h3>Investment Amount</h3>
  <form>
    <div>
      <input type="radio" id="any" name="amount" value="any" />
      <label for="any">Any</label>
    </div>
    <div>
      <input
        type="radio"
        id="five-thousnad"
        name="amount"
        value="five-thousnad"
      />
      <label for="five-thousnad">Under ₹ 5,000</label>
    </div>
    <div>
      <input
        type="radio"
        id="twentyfive-thousnad"
        name="amount"
        value="twentyfive-thousnad"
      />
      <label for="twentyfive-thousnad">Under ₹ 25,000</label>
    </div>
    <div>
      <input
        type="radio"
        id="fifty-thousnad"
        name="amount"
        value="fifty-thousnad"
      />
      <label for="fifty-thousnad">Under ₹ 50,000</label>
    </div>
  </form>
</div>`;
}

function volatilityFilter() {
  return `<div class="filter-volatility">
  <h3>Volatility</h3>
  <div class="volatility-buttons">
    <div>Low</div>
    <div>Medium</div>
    <div>High</div>
  </div>
</div>`;
}

function strategyFilter() {
  return `<div class="filter-strategy">
  <h3>Investment Strategy</h3>
  <form action="">
    <div>
      <input
        type="checkbox"
        id="asset-allocation"
        name="asset-allocation"
        value="asset-allocation"
      />
      <label for="asset-allocation">Asset Allocation</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="dividend"
        name="dividend"
        value="dividend"
      />
      <label for="dividend">Dividend</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="growth"
        name="growth"
        value="growth"
      />
      <label for="growth">Growth</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="momentum"
        name="momentum"
        value="momentum"
      />
      <label for="momentum">Momentum</label>
    </div>
  </form>
</div>`;
}

export {
  totalfilters,
  subTypeFilter,
  investmentAmountFilter,
  volatilityFilter,
  strategyFilter,
};
