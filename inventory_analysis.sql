SELECT COUNT(*)
FROM cleaned_inventory;

SELECT Date, COUNT(*)
FROM cleaned_inventory
GROUP BY Date;

SELECT Date, ROUND(AVG(Price), 2)
FROM cleaned_inventory
GROUP BY Date;
