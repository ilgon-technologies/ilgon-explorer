<h1 align="center">ILGON explorer</h1>
<p align="center">Blockchain Explorer for inspecting and analyzing EVM Chains.</p>

ILGON explorer is a fork of BlockScout. ILGON explorer provides a comprehensive, easy-to-use interface for users to view, confirm, and inspect transactions on EVM (Ethereum Virtual Machine) blockchains. This includes the POA Network, xDai Chain, Ethereum Classic and other **Ethereum testnets, private networks and sidechains**.

## About ILGON explorer

ILGON explorer is an Elixir application that allows users to search transactions, view accounts and balances, and verify smart contracts on the Ethereum network including all forks and sidechains.

Currently available full-featured block explorers (Etherscan, Etherchain, Blockchair) are closed systems which are not independently verifiable.  As Ethereum sidechains continue to proliferate in both private and public settings, transparent, open-source tools are needed to analyze and validate transactions.

## License

[![License: GPL v3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## For developers

### Modifying the RPC network url

Set the `ETHEREUM_JSONRPC_WS_URL`, ETHEREUM_JSONRPC_HTTP_URL` and `ETHEREUM_JSONRPC_TRACE_URL` env variables
