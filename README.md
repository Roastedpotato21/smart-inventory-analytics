# Smart Inventory Analytics Dashboard

A Data Analyst portfolio project built using Excel, MySQL, and Power BI to analyze inventory, pricing, sales, and category-level performance.
## Project Objective

The goal of this project is to analyze retail inventory data and identify useful business insights related to stock levels, product categories, pricing, and sales performance.
## Dataset

- Source: Kaggle
- Dataset: Retail Store Inventory Forecasting Dataset
- Total records: 73,100
- Main fields:
  - Date
  - Store ID
  - Product ID
  - Category
  - Region
  - Inventory Level
  - Units Sold
  - Units Ordered
  - Demand Forecast
  - Price
  - Discount
  - Weather Condition
  - Holiday/Promotion
  - Competitor Pricing
  - Seasonality
  - ## Tools Used

- Microsoft Excel 2016
- MySQL Workbench
- MySQL
- Power BI Desktop
- GitHub
- ## Data Cleaning

The dataset was checked and prepared in Excel before analysis.

- Fixed the Date column display
- Enabled filters
- Checked for blank values
- Checked for duplicate rows
- No duplicate rows were found
- Saved the cleaned dataset as `cleaned_inventory.csv`
## SQL Analysis

The cleaned CSV file was imported into MySQL for analysis.

Database:
`smart_inventory`

Table:
`cleaned_inventory`

Example queries used:

```sql
SELECT COUNT(*)
FROM cleaned_inventory;
SELECT Date, COUNT(*)
FROM cleaned_inventory
GROUP BY Date;
SELECT Date, ROUND(AVG(Price), 2)
FROM cleaned_inventory
GROUP BY Date;
## Power BI Dashboard

The cleaned inventory data was connected from MySQL to Power BI.

The dashboard includes:

- Average Price by Date
- Average Price by Category
- Inventory Level by Category
- Total Units Sold KPI
- Category Slicer
- Key Insights
- Business Recommendations
## Key Insights

- Electronics has the highest average price among the product categories.
- Inventory is distributed almost evenly across product categories.
- Total units sold are approximately 10 million across the dataset.
- Average product prices across categories are close to each other.


## Business Recommendations

- Maintain balanced stock levels across categories to avoid overstocking or shortages.
- Monitor high-demand products regularly and reorder before stock levels become too low.
- Review pricing by category and adjust prices where needed to improve competitiveness and profitability.


## Project Workflow

1. Collected the dataset from Kaggle
2. Opened and inspected the dataset using Excel
3. Checked for missing values and duplicate records
4. Saved the cleaned dataset as `cleaned_inventory.csv`
5. Imported the cleaned CSV file into MySQL
6. Performed SQL analysis
7. Connected MySQL with Power BI
8. Created interactive visualizations
9. Added a Category slicer for filtering
10. Identified key business insights
11. Added business recommendations
12. Built the final Smart Inventory Analytics Dashboard


## Project Structure

```text
Smart-Inventory-Analytics/
│
├── data/
│   └── cleaned_inventory.csv
│
├── sql/
│   └── inventory_analysis.sql
│
├── powerbi/
│   └── Smart_Inventory_Analytics.pbix
│
├── images/
│   └── dashboard.png
│
└── README.md
