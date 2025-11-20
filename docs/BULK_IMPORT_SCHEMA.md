# Bulk Import Schema for Offers

This document describes the CSV schema used by the platform's Bulk Import feature for Offers.

Accepted formats
- CSV (UTF-8). The `BulkUpload` component expects a header row.

Required columns
- `title` - Offer title (string)
- `price` - Offer price (number)

Recommended columns
- `merchant` - Merchant name or ID (required for admin imports)
- `location` - Location/branch name
- `category` - Category name
- `start_date` - ISO date or YYYY-MM-DD (optional)
- `end_date` - ISO date or YYYY-MM-DD (optional)
- `status` - Draft/Published/Archived (optional)
- `max_redemptions` - integer (optional)

Validation rules
- `title` must be non-empty.
- `price` must be numeric.
- For `start_date`/`end_date`, use a valid date format (YYYY-MM-DD recommended).
- Admin imports must include `merchant`.

Example CSV header

```
title,merchant,location,category,price,start_date,end_date,status,max_redemptions
```

Notes
- The current implementation runs validation client-side and reports row-level errors before allowing import.
- On import, a mock service returns an import summary with `total`, `success`, and `failures` (array of { row, errors }).
- If you need Excel support, convert `.xlsx` to CSV before uploading.
