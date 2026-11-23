# Khata — Split Expenses

A small, private expense splitter for friends, flatmates and trips. It runs entirely in the
browser, installs on a phone as an app (PWA), works offline, and keeps all data on the device.
No account, no ads, no subscription. Amounts are in Indian rupees (₹).

## Features

- **People** – add or remove the people sharing costs
- **Expenses** – description, amount, who paid, and who it is split between (equal split)
- **Ledger** – every expense with date, payer and split; delete with one tap
- **Calendar** – month view that marks days with spending; tap a day to see its expenses
- **Balances** – who is owed and who owes, per person
- **Settle up** – the shortest list of payments that clears all debts (greedy matching of the
  largest debtor with the largest creditor, so *n* people need at most *n − 1* payments)
- **PDF report** – summary, ledger, balances and settlements as a downloadable PDF (jsPDF);
  falls back to the browser's print dialog when offline
- **Offline + installable** – a service worker caches the app, so it opens without internet

## Run it

There is nothing to build. Serve the folder over HTTP (service workers do not run from `file://`):

```bash
python -m http.server 8000
# open http://localhost:8000
```

To install on a phone, host the folder on any static host (GitHub Pages, Netlify, Vercel),
open it in Chrome or Safari and choose **Add to Home Screen**.

## How data is stored

Everything is saved in the browser's `localStorage` under the key `khata-state`. Nothing is sent
to a server. Clearing site data, or using a different browser or phone, starts a fresh ledger.

## Files

```
index.html     the whole app: markup, styles and JavaScript
sw.js          service worker (offline cache; clears old caches on update)
manifest.json  PWA name, colours and icons
icon-192.png   app icons
icon-512.png
```

## Possible next steps

- Unequal splits (by shares, percentages or exact amounts)
- Export/import a JSON backup to move data between devices
- Multiple groups (one ledger per trip or flat)

## License

[MIT](LICENSE)
