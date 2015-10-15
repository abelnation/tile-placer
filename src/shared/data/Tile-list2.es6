'use strict'

//
// Tile-list
// Created by dpekar on 10/7/15.
//
const TileConfig = require('./Tile-config')
const StatsConfig = require('./Stats-config')
// const Effect = require('../models/game/Effect')

module.exports = 
[
    {
        'name': 'Convenience Store',
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 6,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Business Supply Store',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.ICONS.OFFICE
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 8,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Fancy Restaurant',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'AFTER',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': -1
                },
                'type': TileConfig.ICONS.RESTAURANT
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 9,
        'number': '3',
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 3
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.RESTAURANT
    },
    {
        'name': 'Farm',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.ICONS.RESTAURANT
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 9,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': -1
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Farm Food Restaurant',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.POPULATION,
                    'value': 3
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 7,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.RESTAURANT
    },
    {
        'name': 'Freeway',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 5,
        'number': 2,
        'immediateEffect': 'NONE',
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Landfill',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.INDUSTRIAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.MUNICIPAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 4,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 2
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Homeowner\'s Association',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.RESIDENTIAL,
        'cost': 6,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 1
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Mint',
        conditionalEffects: [
            {
                'scope': 'OWN',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.MUNICIPAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 15,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 3
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Mobile Home Community',
        conditionalEffects: [],
        'category': TileConfig.CATEGORIES.RESIDENTIAL,
        'cost': 4,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 6
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Municipal Airport',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': 'AIRPORT'
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 6,
        'number': 2,
        'immediateEffect': 'NONE',
        'stage': TileConfig.STAGES.A,
        'icon': 'AIRPORT'
    },
    {
        'name': 'Office Building',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.ICONS.OFFICE
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 9,
        'number': '3',
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.OFFICE
    },
    {
        'name': 'Parking Lot',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.MUNICIPAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 12,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 1
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Slaughterhouse',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.ICONS.RESTAURANT
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 5,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': -2
        },
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Waterfront Realty',
        conditionalEffects: [
            {
                'scope': 'ADJACENT_TO_OWN_LAKE',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.INDUSTRIAL
            },
            {
                'scope': 'ADJACENT_TO_OWN_LAKE',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.MUNICIPAL
            },
            {
                'scope': 'ADJACENT_TO_OWN_LAKE',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            },
            {
                'scope': 'ADJACENT_TO_OWN_LAKE',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 6,
        'number': 2,
        'immediateEffect': 'NONE',
        'stage': TileConfig.STAGES.A,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Burg Von Alspach',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.RESIDENTIAL,
        'cost': 12,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 3
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Domestic Airport',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 1
                },
                'type': 'AIRPORT'
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 11,
        'number': '3',
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.B,
        'icon': 'AIRPORT'
    },
    {
        'name': 'Elementary School',
        conditionalEffects: [
            {
                'scope': 'OWN',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.POPULATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 5,
        'number': '3',
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': 1
        },
        'stage': TileConfig.STAGES.B,
        'icon': 'SCHOOL'
    },
    {
        'name': 'Gas Station',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.POPULATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 7,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Hostel',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.RESIDENTIAL,
        'cost': 0,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 2
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Housing Projects',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -2
                },
                'type': TileConfig.CATEGORIES.MUNICIPAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -2
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -2
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.RESIDENTIAL,
        'cost': 8,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 10
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Movie Theater',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 10,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Casino',
        conditionalEffects: [
            {
                'scope': 'NONE',
                'when': 'AFTER_RED_LINE',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': 'NONE'
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 22,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': -3
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Museum',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.MUNICIPAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 8,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': 1
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Office of Bureaucracy',
        conditionalEffects: [
            {
                'scope': 'OWN',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.MUNICIPAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 9,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': -2
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.OFFICE
    },
    {
        'name': 'Postal Service',
        conditionalEffects: [
            {
                'scope': 'OWN',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 12,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Power Station',
        conditionalEffects: [
            {
                'scope': 'OWN',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.INDUSTRIAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 11,
        'number': 2,
        'immediateEffect': 'NONE',
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Retirement Village',
        conditionalEffects: [],
        'category': TileConfig.CATEGORIES.RESIDENTIAL,
        'cost': 8,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 5
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Skyscraper',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'AFTER',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': -1
                },
                'type': 'SKYSCRAPER'
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 11,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 3
        },
        'stage': TileConfig.STAGES.B,
        'icon': 'SKYSCRAPER'
    },
    {
        'name': 'Shipping Center',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 16,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Stadium',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 16,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Warehouse',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 13,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': -1
        },
        'stage': TileConfig.STAGES.B,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Apartments',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.POPULATION,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.RESIDENTIAL,
        'cost': 12,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 5
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Bed&Breakfast',
        conditionalEffects: [
            {
                'scope': 'OWN',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.POPULATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.RESIDENTIAL,
        'cost': 9,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 2
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Boutique',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 9,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Chip Fabrication Plant',
        conditionalEffects: [
            {
                'scope': 'OWN',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 18,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': 2
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Condominium',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.POPULATION,
                    'value': 3
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.RESIDENTIAL,
        'cost': 14,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 5
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'High School',
        conditionalEffects: [
            {
                'scope': 'OWN',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.POPULATION,
                    'value': 3
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 18,
        'number': '3',
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': 1
        },
        'stage': TileConfig.STAGES.C,
        'icon': 'SCHOOL'
    },
    {
        'name': 'Hotel',
        conditionalEffects: [
            {
                'scope': 'OTHER',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.POPULATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 13,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'International Airport',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': 1
                },
                'type': 'AIRPORT'
            },
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 1
                },
                'type': 'AIRPORT'
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 18,
        'number': 2,
        'immediateEffect': 'NONE',
        'stage': TileConfig.STAGES.C,
        'icon': 'AIRPORT'
    },
    {
        'name': 'Local EPA Office',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.INDUSTRIAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 12,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': 1
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.OFFICE
    },
    {
        'name': 'Middle School',
        conditionalEffects: [
            {
                'scope': 'OWN',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.POPULATION,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 10,
        'number': '3',
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': 1
        },
        'stage': TileConfig.STAGES.C,
        'icon': 'SCHOOL'
    },
    {
        'name': 'New Car Dealership',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'AFTER',
                'effect': {
                    'stat': StatsConfig.STATS.INCOME,
                    'value': -2
                },
                'type': 'NEW_CAR_DEALERSHIP'
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 12,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 5
        },
        'stage': TileConfig.STAGES.C,
        'icon': 'NEW_CAR_DEALERSHIP'
    },
    {
        'name': 'PR Firm',
        conditionalEffects: [
            {
                'scope': 'NONE',
                'when': 'AFTER_RED_LINE',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 1
                },
                'type': 'NONE'
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 20,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': -2
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Recycling Plant',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.INDUSTRIAL
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 17,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.REPUTATION,
            'value': 2
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Resort',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.POPULATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.COMMERCIAL,
        'cost': 16,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'University',
        conditionalEffects: [
            {
                'scope': 'GLOBAL',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 1
                },
                'type': 'SCHOOL'
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 15,
        'number': 2,
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 2
        },
        'stage': TileConfig.STAGES.C,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Suburbs',
        conditionalEffects: [],
        'category': TileConfig.CATEGORIES.RESIDENTIAL,
        'cost': 3,
        'number': '0',
        'immediateEffect': {
            'stat': StatsConfig.STATS.POPULATION,
            'value': 2
        },
        'stage': TileConfig.BASIC,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Community Park',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.INDUSTRIAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': 1
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.MUNICIPAL,
        'cost': 4,
        'number': '0',
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': -1
        },
        'stage': TileConfig.BASIC,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Heavy Factory',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.MUNICIPAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.REPUTATION,
                    'value': -1
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            }
        ],
        'category': TileConfig.CATEGORIES.INDUSTRIAL,
        'cost': 3,
        'number': '0',
        'immediateEffect': {
            'stat': StatsConfig.STATS.INCOME,
            'value': 1
        },
        'stage': TileConfig.BASIC,
        'icon': TileConfig.ICONS.NONE
    },
    {
        'name': 'Lake',
        conditionalEffects: [
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.INDUSTRIAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.MUNICIPAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.RESIDENTIAL
            },
            {
                'scope': 'ADJACENT',
                'when': 'ALWAYS',
                'effect': {
                    'stat': StatsConfig.STATS.MONEY,
                    'value': 2
                },
                'type': TileConfig.CATEGORIES.COMMERCIAL
            }
        ],
        'category': TileConfig.CATEGORIES.LAKE,
        'cost': 0,
        'number': 0,
        'immediateEffect': 'NONE',
        'stage': TileConfig.LAKE,
        'icon': TileConfig.ICONS.NONE
    }
]