-- Smart Inventory Analytics | MySQL 8+
-- Source: cleaned_inventory.csv (synthetic Kaggle portfolio dataset).
-- Import CSV into smart_inventory.cleaned_inventory before running.
-- Import numeric fields as numeric types. Dates are DD-MM-YYYY strings;
-- STR_TO_DATE converts them explicitly for chronological grouping.
-- Inventory sums aggregate daily snapshots, not unique physical stock.
-- Price currency is not specified by the dataset.

USE smart_inventory;

-- Preview: Data validation
SELECT COUNT(*) AS total_records,
       COUNT(DISTINCT `Category`) AS category_count
FROM cleaned_inventory;

-- Preview: Date-level analysis
SELECT STR_TO_DATE(`Date`, '%d-%m-%Y') AS record_date,
       COUNT(*) AS records,
       ROUND(AVG(`Price`), 2) AS average_price
FROM cleaned_inventory
GROUP BY STR_TO_DATE(`Date`, '%d-%m-%Y')
ORDER BY record_date;

-- Preview: Category pricing
SELECT `Category`,
       ROUND(AVG(`Price`), 2) AS average_price
FROM cleaned_inventory
GROUP BY `Category`
ORDER BY average_price DESC, `Category`;

-- Preview: Inventory analysis
SELECT `Category`,
       SUM(`Inventory Level`) AS inventory_observations
FROM cleaned_inventory
GROUP BY `Category`
ORDER BY inventory_observations DESC, `Category`;

-- Preview: Sales analysis
SELECT `Category`,
       SUM(`Units Sold`) AS total_units_sold
FROM cleaned_inventory
GROUP BY `Category`
ORDER BY total_units_sold DESC, `Category`;

-- Preview: Demand analysis
SELECT `Category`,
       ROUND(AVG(`Demand Forecast`), 2) AS avg_demand_forecast
FROM cleaned_inventory
GROUP BY `Category`
ORDER BY avg_demand_forecast DESC, `Category`;

-- Total recorded units sold across the complete dataset.
SELECT SUM(`Units Sold`) AS total_units_sold
FROM cleaned_inventory;

-- Average recorded discount by category. No discount unit is assumed.
SELECT `Category`, ROUND(AVG(`Discount`), 2) AS average_discount
FROM cleaned_inventory
GROUP BY `Category`
ORDER BY average_discount DESC, `Category`;

-- Most-sold product IDs, aggregated over all stores and recorded dates.
SELECT `Product ID`, SUM(`Units Sold`) AS total_units_sold
FROM cleaned_inventory
GROUP BY `Product ID`
ORDER BY total_units_sold DESC, `Product ID`
LIMIT 10;

-- Missing values in the fields used for the website's summaries.
SELECT SUM(`Category` IS NULL OR TRIM(`Category`) = '') AS missing_category,
       SUM(`Price` IS NULL) AS missing_price,
       SUM(`Units Sold` IS NULL) AS missing_units_sold,
       SUM(`Inventory Level` IS NULL) AS missing_inventory
FROM cleaned_inventory;
