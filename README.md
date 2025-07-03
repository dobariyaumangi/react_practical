
# React Budget Dashboard

A React-based dashboard using Ant Design that allows users to upload Excel files and visualize budget vs. actual spending.

## XLSX 
 - Add new column (Id) for perform Update operation on rows
 - use file which i have provided in public folder 

## Features

- Excel file upload (.xlsx/.xls)
- Total spend vs. budget summary
- Overspending alerts by category
- Most-used categories & payment methods
- Table and chart views for data breakdown

## Tech Stack

- React, Ant Design, Recharts
- dayjs for use date
- XLSX.js for Excel parsing

## How to Use

1. Clone repo & install:
   ```bash
   git clone https://github.com/dobariyaumangi/react_practical.git
   cd budget-dashboard
   yarn install
   yarn run dev
   ```
2. Upload Excel 

## File Highlights

- `Dashboard.jsx` – Main dashboard logic
- `/components/` – Reusable UI cards & visualizations
- `SetLogicAndUpdatePage()` – Handles data processing and insights