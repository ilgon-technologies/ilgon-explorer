import $ from 'jquery'
import numeral from 'numeral'
import { BigNumber } from 'bignumber.js'
import moment from 'moment'

export function formatUsdValue (value) {
  return `${formatCurrencyValue(value)} USD`
}

function formatTokenUsdValue (value) {
  return formatCurrencyValue(value, '@')
}

function formatCurrencyValue (value, symbol) {
  symbol = symbol || '$'
  if (value === 0) return `${symbol}0.000000`
  if (value < 0.000001) return `${window.localized['Less than']} ${symbol}0.000001`
  if (value < 1) return `${symbol}${numeral(value).format('0.000000')}`
  if (value < 100000) return `${symbol}${numeral(value).format('0,0.00')}`
  if (value > 1000000000000) return `${symbol}${numeral(value).format('0.000e+0')}`
  return `${symbol}${numeral(value).format('0,0')}`
}

function weiToEther (wei) {
  return new BigNumber(wei).dividedBy('1000000000000000000').toNumber()
}

function etherToUSD (ether, usdExchangeRate) {
  return new BigNumber(ether).multipliedBy(usdExchangeRate).toNumber()
}

export function formatAllUsdValues (root) {
  root = root || $(':root')

  root.find('[data-usd-value]').each((i, el) => {
    el.innerHTML = formatUsdValue(el.dataset.usdValue)
  })
  root.find('[data-token-usd-value]').each((i, el) => {
    el.innerHTML = formatTokenUsdValue(el.dataset.tokenUsdValue)
  })

  return root
}
formatAllUsdValues()

function tryUpdateCalculatedUsdValues (el, usdExchangeRate = el.dataset.usdExchangeRate) {
  // eslint-disable-next-line no-prototype-builtins
  if (!el.dataset.hasOwnProperty('weiValue')) return
  const ether = weiToEther(el.dataset.weiValue)
  const usd = etherToUSD(ether, usdExchangeRate)
  const formattedUsd = formatUsdValue(usd)
  if (formattedUsd !== el.innerHTML) el.innerHTML = formattedUsd
}

function tryUpdateUnitPriceValues (el, usdUnitPrice = el.dataset.usdUnitPrice) {
  const formattedValue = formatCurrencyValue(usdUnitPrice)
  if (formattedValue !== el.innerHTML) el.innerHTML = formattedValue
}

export function updateAllCalculatedUsdValues (usdExchangeRate) {
  $('[data-usd-exchange-rate]').each((i, el) => tryUpdateCalculatedUsdValues(el, usdExchangeRate))
  $('[data-usd-unit-price]').each((i, el) => tryUpdateUnitPriceValues(el, usdExchangeRate))
  const exchangeRateEls = $('[data-ilg-wei-value]')

  if (exchangeRateEls.length > 0) {
    const getUsdUnitPriceEls = () => $('[data-ilg-usd-unit-price]')
    const timestamp =
        moment($('[data-from-now]').get(0).dataset.fromNow).unix()
    fetch(
      'https://priceapi.ilgonwallet.com/prices?timestamp=' + timestamp
    )
      .then(r => r.json())
      .then(r => {
        if ('data' in r) {
          const showPrice = usdExchangeRate => {
            getUsdUnitPriceEls().text(formatCurrencyValue(usdExchangeRate))
            exchangeRateEls.each((i, el) => {
              const ether = weiToEther(el.dataset.weiValue)
              const usd = etherToUSD(ether, usdExchangeRate)
              el.innerHTML = formatUsdValue(usd)
            })
          }

          showPrice(r.data.ILG_USD)
        } else if (r.error.code === 'E001_PRICE_UNKNOWN') {
          exchangeRateEls.text('$N/A USD')
          getUsdUnitPriceEls().text('N/A')
        } else {
          throw new Error()
        }
      })
      .catch(() => {
        exchangeRateEls.text('could not fetch USD price')
        getUsdUnitPriceEls().text('N/A')
      })
  }
}
updateAllCalculatedUsdValues()
