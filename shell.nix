with import (fetchTarball https://github.com/nixos/nixpkgs/tarball/ad7bc980d27849f0862ac14cc92f611638bd0916) { };

stdenv.mkDerivation {
    name = "dev-shell";
    src = null;
    buildInputs = [ nodejs-9_x ];
}
