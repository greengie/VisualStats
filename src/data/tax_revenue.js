"use strict";

const tax_revenue = [
{
"country_code": "AFG",
"country_name": "Afghanistan",
"year": 2010,
"data_value": 8.3138067804,
"color": "#E53935"
},
{
"country_code": "ARM",
"country_name": "Armenia",
"year": 2010,
"data_value": 16.8680604088,
"color": "#E53935"
},
{
"country_code": "BHS",
"country_name": "The Bahamas",
"year": 2010,
"data_value": 14.4000436275,
"color": "#8E24AA"
},
{
"country_code": "BLR",
"country_name": "Belarus",
"year": 2010,
"data_value": 17.0728128828,
"color": "#BA68C8"
},
{
"country_code": "BEL",
"country_name": "Belgium",
"year": 2010,
"data_value": 24.6101403165,
"color": "#BA68C8"
},
{
"country_code": "BEN",
"country_name": "Benin",
"year": 2010,
"data_value": 16.1877511263,
"color": "#4CAF50"
},
{
"country_code": "BIH",
"country_name": "Bosnia and Herzegovina",
"year": 2010,
"data_value": 20.3926990732,
"color": "#BA68C8"
},
{
"country_code": "BFA",
"country_name": "Burkina Faso",
"year": 2010,
"data_value": 12.9506723182,
"color": "#4CAF50"
},
{
"country_code": "KHM",
"country_name": "Cambodia",
"year": 2010,
"data_value": 10.1213791525,
"color": "#E53935"
},
{
"country_code": "CAN",
"country_name": "Canada",
"year": 2010,
"data_value": 11.9319860545,
"color": "#8E24AA"
},
{
"country_code": "CHL",
"country_name": "Chile",
"year": 2010,
"data_value": 17.8304362689,
"color": "#FF5722"
},
{
"country_code": "COL",
"country_name": "Colombia",
"year": 2010,
"data_value": 11.499089808,
"color": "#FF5722"
},
{
"country_code": "COD",
"country_name": "Democratic Republic of the Congo",
"year": 2010,
"data_value": 13.7000050386,
"color": "#4CAF50"
},
{
"country_code": "HRV",
"country_name": "Croatia",
"year": 2010,
"data_value": 18.7876370745,
"color": "#BA68C8"
},
{
"country_code": "CZE",
"country_name": "Czech Republic",
"year": 2010,
"data_value": 13.9258592327,
"color": "#BA68C8"
},
{
"country_code": "EGY",
"country_name": "Egypt",
"year": 2010,
"data_value": 14.1300762473,
"color": "#4CAF50"
},
{
"country_code": "SLV",
"country_name": "El Salvador",
"year": 2010,
"data_value": 13.7498998336,
"color": "#8E24AA"
},
{
"country_code": "GEO",
"country_name": "Georgia",
"year": 2010,
"data_value": 22.0881208149,
"color": "#E53935"
},
{
"country_code": "HND",
"country_name": "Honduras",
"year": 2010,
"data_value": 14.8363222945,
"color": "#8E24AA"
},
{
"country_code": "ISL",
"country_name": "Iceland",
"year": 2010,
"data_value": 21.8646408506,
"color": "#BA68C8"
},
{
"country_code": "IND",
"country_name": "India",
"year": 2010,
"data_value": 9.4789791082,
"color": "#E53935"
},
{
"country_code": "IDN",
"country_name": "Indonesia",
"year": 2010,
"data_value": 10.8921497548,
"color": "#E53935"
},
{
"country_code": "ISR",
"country_name": "Israel",
"year": 2010,
"data_value": 24.3080674336,
"color": "#E53935"
},
{
"country_code": "JOR",
"country_name": "Jordan",
"year": 2010,
"data_value": 15.2903523146,
"color": "#E53935"
},
{
"country_code": "KAZ",
"country_name": "Kazakhstan",
"year": 2010,
"data_value": 8.9386102156,
"color": "#E53935"
},
{
"country_code": "KEN",
"country_name": "Kenya",
"year": 2010,
"data_value": 19.5454947166,
"color": "#4CAF50"
},
{
"country_code": "KOR",
"country_name": "South Korea",
"year": 2010,
"data_value": 15.1532938087,
"color": "#E53935"
},
{
"country_code": "KGZ",
"country_name": "Kyrgyzstan",
"year": 2010,
"data_value": 15.610611215,
"color": "#E53935"
},
{
"country_code": "LAO",
"country_name": "Laos",
"year": 2010,
"data_value": 12.7261262474,
"color": "#E53935"
},
{
"country_code": "LVA",
"country_name": "Latvia",
"year": 2010,
"data_value": 12.7715790007,
"color": "#BA68C8"
},
{
"country_code": "LTU",
"country_name": "Lithuania",
"year": 2010,
"data_value": 13.3584740297,
"color": "#BA68C8"
},
{
"country_code": "LUX",
"country_name": "Luxembourg",
"year": 2010,
"data_value": 24.4856861241,
"color": "#BA68C8"
},
{
"country_code": "MAC",
"country_name": "Macau",
"year": 2010,
"data_value": 34.7348167122,
"color": "#E53935"
},
{
"country_code": "MYS",
"country_name": "Malaysia",
"year": 2010,
"data_value": 14.2976836317,
"color": "#E53935"
},
{
"country_code": "MLT",
"country_name": "Malta",
"year": 2010,
"data_value": 26.53573744,
"color": "#BA68C8"
},
{
"country_code": "MUS",
"country_name": "Mauritius",
"year": 2010,
"data_value": 18.5351610033,
"color": "#4CAF50"
},
{
"country_code": "MDA",
"country_name": "Moldova",
"year": 2010,
"data_value": 18.204707094,
"color": "#BA68C8"
},
{
"country_code": "MNG",
"country_name": "Mongolia",
"year": 2010,
"data_value": 22.7181124793,
"color": "#E53935"
},
{
"country_code": "MAR",
"country_name": "Morocco",
"year": 2010,
"data_value": 23.425973205,
"color": "#4CAF50"
},
{
"country_code": "NPL",
"country_name": "Nepal",
"year": 2010,
"data_value": 13.3364649865,
"color": "#E53935"
},
{
"country_code": "NIC",
"country_name": "Nicaragua",
"year": 2010,
"data_value": 18.2864786208,
"color": "#8E24AA"
},
{
"country_code": "NOR",
"country_name": "Norway",
"year": 2010,
"data_value": 26.876704663,
"color": "#BA68C8"
},
{
"country_code": "PAK",
"country_name": "Pakistan",
"year": 2010,
"data_value": 9.9959047044,
"color": "#E53935"
},
{
"country_code": "PRY",
"country_name": "Paraguay",
"year": 2010,
"data_value": 13.1389511663,
"color": "#FF5722"
},
{
"country_code": "PER",
"country_name": "Peru",
"year": 2010,
"data_value": 14.4959789413,
"color": "#FF5722"
},
{
"country_code": "PHL",
"country_name": "Philippines",
"year": 2010,
"data_value": 12.1468921267,
"color": "#E53935"
},
{
"country_code": "RUS",
"country_name": "Russia",
"year": 2010,
"data_value": 13.4459588268,
"color": "#BA68C8"
},
{
"country_code": "KNA",
"country_name": "Saint Kitts and Nevis",
"year": 2010,
"data_value": 17.5966750789,
"color": "#8E24AA"
},
{
"country_code": "VCT",
"country_name": "Saint Vincent and the Grenadines",
"year": 2010,
"data_value": 22.1490599757,
"color": "#8E24AA"
},
{
"country_code": "SRB",
"country_name": "Serbia",
"year": 2010,
"data_value": 22.0173030202,
"color": "#BA68C8"
},
{
"country_code": "SYC",
"country_name": "Seychelles",
"year": 2010,
"data_value": 28.8419457046,
"color": "#4CAF50"
},
{
"country_code": "SGP",
"country_name": "Singapore",
"year": 2010,
"data_value": 13.7680873051,
"color": "#E53935"
},
{
"country_code": "SVN",
"country_name": "Slovenia",
"year": 2010,
"data_value": 17.1270546857,
"color": "#BA68C8"
},
{
"country_code": "ESP",
"country_name": "Spain",
"year": 2010,
"data_value": 11.1689257673,
"color": "#BA68C8"
},
{
"country_code": "THA",
"country_name": "Thailand",
"year": 2010,
"data_value": 15.9720018791,
"color": "#E53935"
},
{
"country_code": "TGO",
"country_name": "Togo",
"year": 2010,
"data_value": 15.8005411992,
"color": "#4CAF50"
},
{
"country_code": "TUN",
"country_name": "Tunisia",
"year": 2010,
"data_value": 20.0991792389,
"color": "#4CAF50"
},
{
"country_code": "TUR",
"country_name": "Turkey",
"year": 2010,
"data_value": 20.4751587786,
"color": "#E53935"
},
{
"country_code": "USA",
"country_name": "United States",
"year": 2010,
"data_value": 9.2935388073,
"color": "#8E24AA"
},
{
"country_code": "URY",
"country_name": "Uruguay",
"year": 2010,
"data_value": 19.4827853476,
"color": "#FF5722"
},
{
"country_code": "ZMB",
"country_name": "Zambia",
"year": 2010,
"data_value": 16.5794230184,
"color": "#4CAF50"
}
]
export default tax_revenue;
