#!/bin/sh
# updates the static js files which are provided by the server
mix do phx.digest.clean, phx.digest
