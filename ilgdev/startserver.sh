#!/bin/sh
# after startup you can use the explorer on http://localhost:4000/
  DATABASE_URL="postgresql://qp@localhost:5432/explorer_dev" \
  LOGO="/images/ilg_header_main_logo.svg" \
  LOGO_HEADER="/images/ilg_main_logo.svg" \
  LOGO_FOOTER="/images/ilg_footer_main_logo.svg" \
  CHAIN_SPEC_PATH="/home/ilgGenesis.json" \
  COIN="ILG" \
  DISABLE_EXCHANGE_RATES="false" \
  SHOW_PRICE_CHART="true" \
  ECTO_USE_SSL="false" \
  ETHEREUM_JSONRPC_VARIANT="parity" \
  ETHEREUM_JSONRPC_HTTP_URL="http://173.249.1.181:48545/" \
  ETHEREUM_JSONRPC_TRACE_URL="http://173.249.1.181:48545/" \
  NETWORK="ILGON" \
  REWARDS_CONTRACT="0xA000000000000000000000000000000000000000" \
  SECRET_KEY_BASE="sfsfdsfsfdsfdssdsdfdsfddsffdsfdsfdsfdsfdsfds" \
  SUBNETWORK="" \
  VALIDATORS_CONTRACT="0xB000000000000000000000000000000000000000" \
  EMISSION_FORMAT="POA" \
  SERVER_INFO="2" \
  CURRENCY="ILGT" \
  mix phx.server
