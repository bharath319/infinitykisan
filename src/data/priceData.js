
export const PRICE_DATABASE = {
    'Rice': {
        // North
        'Punjab': {
            'Ludhiana': { 'Ludhiana Mandi': { wholesale: 3200, retail: 3500, msp: 2183, trend: [3000, 3100, 3200, 3300, 3400, 3500] } },
            'Patiala': { 'Patiala Mandi': { wholesale: 3150, retail: 3450, msp: 2183, trend: [2950, 3050, 3150, 3250, 3350, 3450] } }
        },
        'Haryana': {
            'Karnal': { 'Karnal Mandi': { wholesale: 3300, retail: 3600, msp: 2183, trend: [3100, 3200, 3300, 3400, 3500, 3600] } },
            'Kurukshetra': { 'Thanesar Mandi': { wholesale: 3250, retail: 3550, msp: 2183, trend: [3050, 3150, 3250, 3350, 3450, 3550] } }
        },
        'Uttar Pradesh': {
            'Varanasi': { 'Varanasi Mandi': { wholesale: 3000, retail: 3300, msp: 2183, trend: [2900, 2950, 3000, 3050, 3100, 3150] } },
            'Gorakhpur': { 'Gorakhpur Mandi': { wholesale: 2900, retail: 3200, msp: 2183, trend: [2800, 2850, 2900, 2950, 3000, 3050] } }
        },
        'Uttarakhand': {
            'Udham Singh Nagar': { 'Rudrapur Mandi': { wholesale: 3100, retail: 3400, msp: 2183, trend: [3000, 3050, 3100, 3150, 3200, 3250] } }
        },
        'Himachal Pradesh': {
            'Kangra': { 'Kangra Mandi': { wholesale: 3200, retail: 3500, msp: 2183, trend: [3100, 3150, 3200, 3250, 3300, 3350] } }
        },
        'Jammu and Kashmir': {
            'Jammu': { 'Narwal Mandi': { wholesale: 3300, retail: 3600, msp: 2183, trend: [3200, 3250, 3300, 3350, 3400, 3450] } }
        },
        'Ladakh': {
            'Leh': { 'Leh Market': { wholesale: 3600, retail: 4000, msp: null, trend: [3500, 3550, 3600, 3650, 3700, 3750] } }
        },
        'Delhi': {
            'Delhi': { 'Narela Mandi': { wholesale: 3400, retail: 3800, msp: 2183, trend: [3300, 3350, 3400, 3450, 3500, 3550] } }
        },
        'Chandigarh': {
            'Chandigarh': { 'Grain Market Sector 26': { wholesale: 3350, retail: 3650, msp: 2183, trend: [3250, 3300, 3350, 3400, 3450, 3500] } }
        },
        'Rajasthan': {
            'Kota': { 'Kota Mandi': { wholesale: 3100, retail: 3400, msp: 2183, trend: [3000, 3050, 3100, 3150, 3200, 3250] } },
            'Bundi': { 'Bundi Mandi': { wholesale: 3050, retail: 3350, msp: 2183, trend: [2950, 3000, 3050, 3100, 3150, 3200] } }
        },
        'Gujarat': {
            'Ahmedabad': { 'Bavla Mandi': { wholesale: 3200, retail: 3500, msp: 2183, trend: [3100, 3150, 3200, 3250, 3300, 3350] } },
            'Anand': { 'Khambhat Mandi': { wholesale: 3150, retail: 3450, msp: 2183, trend: [3050, 3100, 3150, 3200, 3250, 3300] } }
        },

        // East & North East
        'West Bengal': {
            'Bardhaman': { 'Bardhaman Mandi': { wholesale: 3100, retail: 3400, msp: 2183, trend: [3000, 3050, 3100, 3150, 3200, 3250] } },
            'Hooghly': { 'Hooghly Mandi': { wholesale: 3120, retail: 3420, msp: 2183, trend: [3020, 3070, 3120, 3170, 3220, 3270] } }
        },
        'Odisha': {
            'Cuttack': { 'Cuttack Mandi': { wholesale: 2950, retail: 3250, msp: 2183, trend: [2850, 2900, 2950, 3000, 3050, 3100] } },
            'Bargarh': { 'Bargarh Mandi': { wholesale: 2900, retail: 3200, msp: 2183, trend: [2800, 2850, 2900, 2950, 3000, 3050] } }
        },
        'Bihar': {
            'Patna': { 'Patna Mandi': { wholesale: 2800, retail: 3100, msp: 2183, trend: [2700, 2750, 2800, 2850, 2900, 2950] } },
            'Rohtas': { 'Sasaram Mandi': { wholesale: 2750, retail: 3050, msp: 2183, trend: [2650, 2700, 2750, 2800, 2850, 2900] } }
        },
        'Jharkhand': {
            'Ranchi': { 'Pandra Mandi': { wholesale: 2900, retail: 3200, msp: 2183, trend: [2800, 2850, 2900, 2950, 3000, 3050] } }
        },
        'Assam': {
            'Guwahati': { 'Pamohi Mandi': { wholesale: 3200, retail: 3500, msp: 2183, trend: [3100, 3150, 3200, 3250, 3300, 3350] } }
        },
        'Tripura': {
            'Agartala': { 'Battala Market': { wholesale: 3300, retail: 3600, msp: 2183, trend: [3200, 3250, 3300, 3350, 3400, 3450] } }
        },
        'Manipur': {
            'Imphal East': { 'Ima Keithel': { wholesale: 3400, retail: 3700, msp: 2183, trend: [3300, 3350, 3400, 3450, 3500, 3550] } }
        },
        'Meghalaya': {
            'East The Hills': { 'Shillong Bora Bazar': { wholesale: 3500, retail: 3800, msp: 2183, trend: [3400, 3450, 3500, 3550, 3600, 3650] } }
        },
        'Nagaland': {
            'Dimapur': { 'Dimapur Mandi': { wholesale: 3350, retail: 3650, msp: 2183, trend: [3250, 3300, 3350, 3400, 3450, 3500] } }
        },
        'Arunachal Pradesh': {
            'Papum Pare': { 'Itanagar Market': { wholesale: 3450, retail: 3750, msp: 2183, trend: [3350, 3400, 3450, 3500, 3550, 3600] } }
        },
        'Mizoram': {
            'Aizawl': { 'New Market': { wholesale: 3500, retail: 3800, msp: 2183, trend: [3400, 3450, 3500, 3550, 3600, 3650] } }
        },
        'Sikkim': {
            'East Sikkim': { 'Gangtok Market': { wholesale: 3600, retail: 3900, msp: 2183, trend: [3500, 3550, 3600, 3650, 3700, 3750] } }
        },

        // South
        'Andhra Pradesh': {
            'East Godavari': { 'Kakinada Market': { wholesale: 3050, retail: 3350, msp: 2183, trend: [2950, 3000, 3050, 3100, 3150, 3200] } },
            'Krishna': { 'Vijayawada Market': { wholesale: 3100, retail: 3400, msp: 2183, trend: [3000, 3050, 3100, 3150, 3200, 3250] } }
        },
        'Telangana': {
            'Nalgonda': { 'Nalgonda Mandi': { wholesale: 3000, retail: 3300, msp: 2183, trend: [2900, 2950, 3000, 3050, 3100, 3150] } },
            'Karimnagar': { 'Karimnagar Mandi': { wholesale: 3020, retail: 3320, msp: 2183, trend: [2920, 2970, 3020, 3070, 3120, 3170] } }
        },
        'Tamil Nadu': {
            'Thanjavur': { 'Thanjavur Mandi': { wholesale: 3150, retail: 3450, msp: 2183, trend: [3050, 3100, 3150, 3200, 3250, 3300] } },
            'Madurai': { 'Madurai Market': { wholesale: 3200, retail: 3500, msp: 2183, trend: [3100, 3150, 3200, 3250, 3300, 3350] } }
        },
        'Karnataka': {
            'Raichur': { 'Raichur Mandi': { wholesale: 3100, retail: 3400, msp: 2183, trend: [3000, 3050, 3100, 3150, 3200, 3250] } },
            'Mysuru': { 'APMC Mysuru': { wholesale: 3250, retail: 3550, msp: 2183, trend: [3150, 3200, 3250, 3300, 3350, 3400] } }
        },
        'Kerala': {
            'Palakkad': { 'Palakkad Market': { wholesale: 3400, retail: 3800, msp: 2183, trend: [3300, 3350, 3400, 3450, 3500, 3550] } }
        },
        'Puducherry': {
            'Puducherry': { 'Puducherry Market': { wholesale: 3200, retail: 3500, msp: 2183, trend: [3100, 3150, 3200, 3250, 3300, 3350] } }
        },

        // Central & West
        'Chhattisgarh': {
            'Raipur': { 'Raipur Mandi': { wholesale: 2800, retail: 3100, msp: 2183, trend: [2700, 2750, 2800, 2850, 2900, 2950] } },
            'Durg': { 'Durg Mandi': { wholesale: 2780, retail: 3080, msp: 2183, trend: [2680, 2730, 2780, 2830, 2880, 2930] } }
        },
        'Madhya Pradesh': {
            'Balaghat': { 'Balaghat Mandi': { wholesale: 2850, retail: 3150, msp: 2183, trend: [2750, 2800, 2850, 2900, 2950, 3000] } }
        },
        'Maharashtra': {
            'Bhandara': { 'Bhandara Mandi': { wholesale: 3000, retail: 3300, msp: 2183, trend: [2900, 2950, 3000, 3050, 3100, 3150] } }
        },
        'Goa': {
            'North Goa': { 'Mapusa Market': { wholesale: 3500, retail: 3800, msp: null, trend: [3400, 3450, 3500, 3550, 3600, 3650] } }
        },
        'Dadra and Nagar Haveli and Daman and Diu': {
            'Silvassa': { 'Silvassa Market': { wholesale: 3300, retail: 3600, msp: null, trend: [3200, 3250, 3300, 3350, 3400, 3450] } }
        },
        'Lakshadweep': {
            'Kavaratti': { 'Kavaratti Market': { wholesale: 3800, retail: 4200, msp: null, trend: [3700, 3750, 3800, 3850, 3900, 3950] } }
        },
        'Andaman and Nicobar Islands': {
            'South Andaman': { 'Port Blair Market': { wholesale: 3800, retail: 4200, msp: null, trend: [3700, 3750, 3800, 3850, 3900, 3950] } }
        }
    },
    'Wheat': {
        'Punjab': {
            'Ludhiana': { 'Ludhiana Mandi': { wholesale: 2200, retail: 2400, msp: 2275, trend: [2100, 2150, 2200, 2250, 2300, 2350] } },
            'Amritsar': { 'Amritsar Mandi': { wholesale: 2180, retail: 2380, msp: 2275, trend: [2080, 2130, 2180, 2230, 2280, 2330] } }
        },
        'Haryana': {
            'Karnal': { 'Karnal Mandi': { wholesale: 2220, retail: 2420, msp: 2275, trend: [2120, 2170, 2220, 2270, 2320, 2370] } }
        },
        'Uttar Pradesh': {
            'Lucknow': { 'Lucknow Mandi': { wholesale: 2150, retail: 2350, msp: 2275, trend: [2050, 2100, 2150, 2200, 2250, 2300] } },
            'Kanpur': { 'Kanpur Mandi': { wholesale: 2160, retail: 2360, msp: 2275, trend: [2060, 2110, 2160, 2210, 2260, 2310] } }
        },
        'Madhya Pradesh': {
            'Indore': { 'Indore Mandi': { wholesale: 2300, retail: 2500, msp: 2275, trend: [2200, 2250, 2300, 2350, 2400, 2450] } }
        },
        'Rajasthan': {
            'Jaipur': { 'Jaipur Mandi': { wholesale: 2250, retail: 2450, msp: 2275, trend: [2150, 2200, 2250, 2300, 2350, 2400] } }
        },
        'Gujarat': {
            'Ahmedabad': { 'APMC Ahmedabad': { wholesale: 2350, retail: 2600, msp: 2275, trend: [2250, 2300, 2350, 2400, 2450, 2500] } }
        },
        'Bihar': {
            'Patna': { 'Patna Mandi': { wholesale: 2200, retail: 2400, msp: 2275, trend: [2100, 2150, 2200, 2250, 2300, 2350] } }
        }
    },
    'Potato': {
        // Potato is consumed everywhere, good for UTs/smaller states
        'Uttar Pradesh': {
            'Agra': { 'Agra Mandi': { wholesale: 1500, retail: 2000, msp: null, trend: [1200, 1300, 1500, 1600, 1800, 1900] } }
        },
        'West Bengal': {
            'Hooghly': { 'Hooghly Mandi': { wholesale: 1600, retail: 2100, msp: null, trend: [1300, 1400, 1600, 1700, 1900, 2000] } }
        },
        'Punjab': {
            'Jalandhar': { 'Jalandhar Mandi': { wholesale: 1400, retail: 1900, msp: null, trend: [1100, 1200, 1400, 1500, 1700, 1800] } }
        },
        'Himachal Pradesh': {
            'Shimla': { 'Shimla Mandi': { wholesale: 1800, retail: 2300, msp: null, trend: [1500, 1600, 1800, 1900, 2100, 2200] } }
        },
        'Meghalaya': {
            'Shillong': { 'Shillong Potato Market': { wholesale: 2000, retail: 2500, msp: null, trend: [1800, 1900, 2000, 2100, 2200, 2300] } }
        },
        'Dadra and Nagar Haveli and Daman and Diu': {
            'Daman': { 'Daman Market': { wholesale: 1900, retail: 2400, msp: null, trend: [1700, 1800, 1900, 2000, 2100, 2200] } }
        },
        'Lakshadweep': {
            'Kavaratti': { 'Kavaratti Market': { wholesale: 2500, retail: 3000, msp: null, trend: [2300, 2400, 2500, 2600, 2700, 2800] } }
        },
        'Ladakh': {
            'Leh': { 'Leh Market': { wholesale: 2200, retail: 2800, msp: null, trend: [2000, 2100, 2200, 2300, 2400, 2500] } }
        }
    },
    'Onion': {
        'Maharashtra': {
            'Nashik': { 'Lasalgaon Mandi': { wholesale: 2500, retail: 3500, msp: null, trend: [2000, 2200, 2500, 3000, 3500, 4000] } },
            'Ahmednagar': { 'Ahmednagar Mandi': { wholesale: 2400, retail: 3400, msp: null, trend: [1900, 2100, 2400, 2900, 3400, 3900] } }
        },
        'Karnataka': {
            'Hubli': { 'Hubli Mandi': { wholesale: 2400, retail: 3400, msp: null, trend: [1900, 2100, 2400, 2900, 3400, 3900] } }
        },
        'Madhya Pradesh': {
            'Indore': { 'Indore Mandi': { wholesale: 2300, retail: 3300, msp: null, trend: [1800, 2000, 2300, 2800, 3300, 3800] } }
        },
        'Gujarat': {
            'Bhavnagar': { 'Bhavnagar Mandi': { wholesale: 2350, retail: 3350, msp: null, trend: [1850, 2050, 2350, 2850, 3350, 3850] } }
        },
        'Rajasthan': {
            'Alwar': { 'Alwar Mandi': { wholesale: 2200, retail: 3200, msp: null, trend: [1700, 1900, 2200, 2700, 3200, 3700] } }
        }
    },
    'Tomato': {
        'Andhra Pradesh': {
            'Chittoor': { 'Madanapalle Market': { wholesale: 3000, retail: 4000, msp: null, trend: [2500, 2800, 3000, 3500, 4000, 4500] } }
        },
        'Karnataka': {
            'Kolar': { 'Kolar Mandi': { wholesale: 2900, retail: 3900, msp: null, trend: [2400, 2700, 2900, 3400, 3900, 4400] } }
        },
        'Maharashtra': {
            'Nashik': { 'Nashik Mandi': { wholesale: 2800, retail: 3800, msp: null, trend: [2300, 2600, 2800, 3300, 3800, 4300] } }
        },
        'Himachal Pradesh': {
            'Solan': { 'Solan Mandi': { wholesale: 3200, retail: 4200, msp: null, trend: [2700, 3000, 3200, 3700, 4200, 4700] } }
        }
    },
    'Cotton': {
        'Gujarat': {
            'Rajkot': { 'Rajkot Mandi': { wholesale: 7000, retail: 7300, msp: 6620, trend: [6800, 6900, 7000, 7100, 7200, 7300] } }
        },
        'Maharashtra': {
            'Akola': { 'Akola Mandi': { wholesale: 6900, retail: 7200, msp: 6620, trend: [6700, 6800, 6900, 7000, 7100, 7200] } }
        },
        'Telangana': {
            'Warangal': { 'Warangal Mandi': { wholesale: 6980, retail: 7280, msp: 6620, trend: [6780, 6880, 6980, 7080, 7180, 7280] } }
        },
        'Punjab': {
            'Bathinda': { 'Bathinda Mandi': { wholesale: 6800, retail: 7100, msp: 6620, trend: [6600, 6700, 6800, 6900, 7000, 7100] } }
        }
    },
    'Sugarcane': {
        'Uttar Pradesh': {
            'Meerut': { 'Meerut Mandi': { wholesale: 350, retail: 380, msp: 340, trend: [330, 340, 350, 360, 370, 380] } }
        },
        'Maharashtra': {
            'Kolhapur': { 'Kolhapur Mandi': { wholesale: 360, retail: 390, msp: 340, trend: [340, 350, 360, 370, 380, 390] } }
        },
        'Karnataka': {
            'Belagavi': { 'Belagavi Mandi': { wholesale: 345, retail: 375, msp: 340, trend: [325, 335, 345, 355, 365, 375] } }
        }
    },
    'Soybean': {
        'Madhya Pradesh': {
            'Ujjain': { 'Ujjain Mandi': { wholesale: 4800, retail: 5200, msp: 4600, trend: [4600, 4700, 4800, 4900, 5000, 5100] } }
        },
        'Maharashtra': {
            'Latur': { 'Latur Mandi': { wholesale: 4900, retail: 5300, msp: 4600, trend: [4700, 4800, 4900, 5000, 5100, 5200] } }
        }
    },
    'Mustard': {
        'Rajasthan': {
            'Bharatpur': { 'Bharatpur Mandi': { wholesale: 5200, retail: 5600, msp: 5650, trend: [5000, 5100, 5200, 5300, 5400, 5500] } }
        },
        'Haryana': {
            'Hisar': { 'Hisar Mandi': { wholesale: 5100, retail: 5500, msp: 5650, trend: [4900, 5000, 5100, 5200, 5300, 5400] } }
        }
    },
    'Coffee': {
        'Karnataka': {
            'Kodagu': { 'Madikeri Market': { wholesale: 25000, retail: 28000, msp: null, trend: [24000, 24500, 25000, 25500, 26000, 26500] } }
        },
        'Kerala': {
            'Wayanad': { 'Kalpetta Market': { wholesale: 24500, retail: 27500, msp: null, trend: [23500, 24000, 24500, 25000, 25500, 26000] } }
        }
    },
    'Apple': {
        'Jammu and Kashmir': {
            'Sopore': { 'Sopore Fruit Mandi': { wholesale: 5000, retail: 8000, msp: null, trend: [4500, 4800, 5000, 5500, 6000, 6500] } }
        },
        'Himachal Pradesh': {
            'Shimla': { 'Shimla Fruit Market': { wholesale: 5200, retail: 8200, msp: null, trend: [4700, 5000, 5200, 5700, 6200, 6700] } }
        }
    },
    'Coconut': {
        'Kerala': {
            'Kozhikode': { 'Kozhikode Market': { wholesale: 2500, retail: 3500, msp: null, trend: [2300, 2400, 2500, 2600, 2700, 2800] } }
        },
        'Tamil Nadu': {
            'Coimbatore': { 'Pollachi Market': { wholesale: 2400, retail: 3400, msp: null, trend: [2200, 2300, 2400, 2500, 2600, 2700] } }
        },
        'Lakshadweep': {
            'Andrott': { 'Andrott Market': { wholesale: 2200, retail: 3000, msp: null, trend: [2000, 2100, 2200, 2300, 2400, 2500] } }
        }
    }
};
