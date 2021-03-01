import $ from 'jquery'
import numeral from 'numeral'
import { BigNumber } from 'bignumber.js'

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

export function updateAllCalculatedUsdValues () {
  const exchangeRateEls = () => $('[data-usd-exchange-rate]')
    .filter((i, el) =>
    // eslint-disable-next-line no-prototype-builtins
      el.dataset.hasOwnProperty('weiValue'))

  if (exchangeRateEls().length > 0) {
    const usdUnitPriceEls = () => $('[data-usd-unit-price]')
    const setInnerHtml = innerHtml => (_, el) => {
      el.innerHTML = innerHtml
      return undefined
    }
    const getTimestamp = () => {
      const transactionDataDataSet = $('[data-from-now]').first().dataset
      return transactionDataDataSet === undefined
        ? null
        : new Date(transactionDataDataSet.fromNow).getTime() / 1000
    }

    exchangeRateEls().each(setInnerHtml('$... USD'))
    usdUnitPriceEls().each(setInnerHtml('...'))
    const timestamp = getTimestamp()
    fetch(
      'https://priceapi.ilgonwallet.com/prices' +
          (timestamp === null ? '' : '?timestamp=' + timestamp)
    )
      .then(r => r.json())
      .then(r => {
        if ('data' in r) {
          const showPrice = usdExchangeRate => {
            usdUnitPriceEls().each(setInnerHtml(formatCurrencyValue(usdExchangeRate)))
            exchangeRateEls().each((i, el) => {
              const ether = weiToEther(el.dataset.weiValue)
              const usd = etherToUSD(ether, usdExchangeRate)
              el.innerHTML = formatUsdValue(usd)
            })
          }

          showPrice(r.data.ILG_USD)
        } else if (r.error.code === 'E001_PRICE_UNKNOWN') {
          exchangeRateEls().each(setInnerHtml('$N/A USD'))
          usdUnitPriceEls().each(setInnerHtml('N/A'))
        } else {
          throw new Error()
        }
      })
      .catch(() => {
        exchangeRateEls().each(setInnerHtml('could not fetch USD price'))
        usdUnitPriceEls().each(setInnerHtml('N/A'))
      })
  }
}
updateAllCalculatedUsdValues()
