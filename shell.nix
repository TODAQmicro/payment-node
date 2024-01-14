let
  pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
  buildInputs = [
    pkgs.httpie
    pkgs.jq
    pkgs.nodejs_20
    pkgs.typescript
    pkgs.wget
  ];
}
