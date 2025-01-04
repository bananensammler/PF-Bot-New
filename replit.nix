{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x   # Stelle sicher, dass du die passende Node.js-Version benutzt
    pkgs.pkg-config
    pkgs.libuuid
    pkgs.cairo
    pkgs.pango
    pkgs.gtk3
    pkgs.libjpeg
    pkgs.libpng
    pkgs.glib
  ];
}
