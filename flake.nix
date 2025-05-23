{
  description = "Next.js development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        nodejs = pkgs.nodejs_22;
        pnpm = pkgs.nodePackages.pnpm;
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [ nodejs pnpm ];

          shellHook = ''
            echo "Node.js $(node --version) development environment"
            echo "pnpm $(pnpm --version) package manager"
            export PATH="$PWD/node_modules/.bin:$PATH"
          '';
        };
      });
}
