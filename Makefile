# -*- Mode: Makefile -*-
#
# Makefile for Toggle Fonts
#

FILES = manifest.json \
        background.js \
        $(wildcard _locales/*/messages.json) \
        $(wildcard icons/*.svg)

togglefonts-trunk.xpi: $(FILES) icons/togglefonts-light.svg
	@zip -9 - $^ > $@

icons/togglefonts-light.svg: icons/togglefonts.svg
	@sed 's/:#0c0c0d/:#f9f9fa/g' $^ > $@

clean:
	rm -f togglefonts-trunk.xpi
	rm -f icons/togglefonts-light.svg
