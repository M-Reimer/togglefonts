/*
    Firefox addon "Toggle Fonts"
    Copyright (C) 2019  Manuel Reimer <manuel.reimer@gmx.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// Fired if the toolbar button is clicked.
// Toggles the font setting.
async function ToolbarButtonClicked() {
  let value = (await browser.browserSettings.useDocumentFonts.get({})).value;
  await browser.browserSettings.useDocumentFonts.set({value: !value});
  await UpdateBadge();
}

// Sets browserAction badge text based on font status.
async function UpdateBadge() {
  const value = (await browser.browserSettings.useDocumentFonts.get({})).value;
  const badgetext = value ? "" : "X";
  const title = browser.i18n.getMessage("button_title") + " (" +
      browser.i18n.getMessage(value ? "title_enabled" : "title_disabled") +
      ")";

  if (browser.browserAction.setBadgeText !== undefined) // Not Android
    browser.browserAction.setBadgeText({text: badgetext});
  browser.browserAction.setTitle({title: title});
}

// Set background color to a non-intrusive gray
if (browser.browserAction.setBadgeBackgroundColor !== undefined) // Not Android
  browser.browserAction.setBadgeBackgroundColor({color: "#666666"});

// Register event listeners
browser.browserAction.onClicked.addListener(ToolbarButtonClicked);

// Update badge for the first time
UpdateBadge();

IconUpdater.Init("icons/togglefonts.svg");
