#!/usr/bin/env bash
# Install LaTeX toolchain and required packages if not already present.
# Mirrors the CI step in .github/workflows/deploy.yml.
# Uses `kpsewhich enumitem.sty` as the sentinel: pdflatex alone is not enough
# since basictex on macOS is minimal and missing extra packages.

if command -v pdflatex &> /dev/null && kpsewhich enumitem.sty &> /dev/null; then
    exit 0
fi

echo "LaTeX or required packages not found -- installing..."

OS="$(uname -s)"
case "$OS" in
    Linux*)
        sudo apt-get update && sudo apt-get install -y \
            texlive-latex-base \
            texlive-latex-extra \
            texlive-fonts-recommended
        ;;
    Darwin*)
        if ! command -v brew &> /dev/null; then
            echo "Homebrew is required to install LaTeX on macOS. See https://brew.sh" >&2
            exit 1
        fi
        brew install --cask basictex
        # Add TeX Live binaries to PATH for the current session
        eval "$(/usr/libexec/path_helper)"
        # Install extra packages not bundled with basictex (mirrors texlive-latex-extra on Linux)
        sudo tlmgr update --self
        sudo tlmgr install enumitem titlesec amsfonts
        ;;
    *)
        echo "Unsupported OS: $OS. Install pdflatex manually." >&2
        exit 1
        ;;
esac
