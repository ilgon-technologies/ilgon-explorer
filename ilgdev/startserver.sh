#!/bin/sh
  DATABASE_URL="postgresql://qp@localhost:5432/explorer_dev" \
  BLOCKSCOUT_HOST="0.0.0.0" \
  BLOCKSCOUT_PROTOCOL="http" \
  PORT="8080" \
  LOGO="/images/ilg_header_main_logo.svg" \
  LOGO_HEADER="/images/ilg_main_logo.svg" \
  LOGO_FOOTER="/images/ilg_footer_main_logo.svg" \
  CHAIN_SPEC_PATH="/home/ilgGenesis.json" \
  COIN="ILG" \
  DISABLE_EXCHANGE_RATES="true" \
  SHOW_PRICE_CHART="false" \
  ECTO_USE_SSL="false" \
  ETHEREUM_JSONRPC_VARIANT="parity" \
  ETHEREUM_JSONRPC_HTTP_URL="https://wallet.ilgointest.e-diploma.org/rpc/ilgtest/" \
  ETHEREUM_JSONRPC_TRACE_URL="https://wallet.ilgointest.e-diploma.org/rpc/ilgtest/" \
  NETWORK="ILGCoin" \
  REWARDS_CONTRACT="0xA000000000000000000000000000000000000000" \
  SECRET_KEY_BASE="sfsfdsfsfdsfdssdsdfdsfddsffdsfdsfdsfdsfdsfds" \
  SUBNETWORK="ILG" \
  VALIDATORS_CONTRACT="0xB000000000000000000000000000000000000000" \
  EMISSION_FORMAT="POA" \
  SERVER_INFO="2" \
  CURRENCY="ILGT" \
  mix phx.server
