-- query sritng for query how many people that go into this country each year.
SELECT destination_country AS country, year, sum(total) AS in_value FROM migration_data WHERE year = 1990 GROUP BY destination_country,year ORDER BY country;
-- query sritng for query how many people that go out this country each year.
SELECT origin_country AS country, year, sum(total) AS out_value FROM migration_data WHERE (year = 1990) and (destination_country='Developed regions' or destination_country='Developing regions') GROUP BY origin_country,year ORDER BY country;
