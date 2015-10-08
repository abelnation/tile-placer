'use strict'

//
// Tile-lis
// Created by dpekar on 10/7/15.
//

module.exports = {

    'basic': [
        {
          name: 'Suburbs',
          cost: 3,
          category: 'Residential',
          icon: null,
          stage: 'basic',
          immediateEffect: (player) => { player.population = player.population + 2},
          conditionalEffect: (player) => { }
        },
        {
          name: 'Community Park',
          cost: 4,
          category: 'Municipal',
          icon: null,
          stage: 'basic',
          immediateEffect: (player) => { player.income-- },
          conditionalEffect: (player) => { }
        },
        {
          name: 'Heavy Factory',
          cost: 3,
          category: 'Industrial',
          icon: null,
          stage: 'basic',
          immediateEffect: (player) => { player.income++ },
          conditionalEffect: (player) => { }
        }
    ],

    'a': [
        {
          name: 'Convenience Store',
          cost: 6,
          category: 'Commericial',
          icon: null,
          stage: 'a',
          immediateEffect: (player) => { player.income++ },
          conditionalEffect: (player) => { }
        },
        {
          name: 'Mobile Home Community',
          cost: 4,
          category: 'Commericial',
          icon: null,
          stage: 'a',
          immediateEffect: (player) => { player.population = player.population + 6 },
          conditionalEffect: (player) => { }
        },
        {
          name: 'Farm',
          cost: 9,
          category: 'Industrial',
          icon: null,
          stage: 'a',
          immediateEffect: (player) => { player.reputation--},
          conditionalEffect: (player) => { }
        },
        {
          name: 'Landfill',
          cost: 4,
          category: 'Industrial',
          icon: null,
          stage: 'a',
          immediateEffect: (player) => { player.income = player.income + 2 },
          conditionalEffect: (player) => { }
        },
        {
          name: 'Mint',
          cost: 15,
          category: 'Industrial',
          icon: null,
          stage: 'a',
          immediateEffect: (player) => { player.income = player.income + 3},
          conditionalEffect: (player) => { }
        } 
    ],

    'b': [
        {
          name: 'Convenience Store',
          cost: 6,
          category: 'Commericial',
          icon: null,
          stage: 'b',
          immediateEffect: (player) => { player.income++ },
          conditionalEffect: (player) => { }
        },
        {
          name: 'Mobile Home Community',
          cost: 4,
          category: 'Commericial',
          icon: null,
          stage: 'b',
          immediateEffect: (player) => { player.population = player.population + 6 },
          conditionalEffect: (player) => { }
        },
        {
          name: 'Farm',
          cost: 9,
          category: 'Industrial',
          icon: null,
          stage: 'b',
          immediateEffect: (player) => { player.reputation--},
          conditionalEffect: (player) => { }
        },
        {
          name: 'Landfill',
          cost: 4,
          category: 'Industrial',
          icon: null,
          stage: 'b',
          immediateEffect: (player) => { player.income = player.income + 2 },
          conditionalEffect: (player) => { }
        },
        {
          name: 'Mint',
          cost: 15,
          category: 'Industrial',
          icon: null,
          stage: 'b',
          immediateEffect: (player) => { player.income = player.income + 3},
          conditionalEffect: (player) => { }
        }
    ],

    'c': [
        {
          name: 'Convenience Store',
          cost: 6,
          category: 'Commericial',
          icon: null,
          stage: 'c',
          immediateEffect: (player) => { player.income++ },
          conditionalEffect: (player) => { }
        },
        {
          name: 'Mobile Home Community',
          cost: 4,
          category: 'Commericial',
          icon: null,
          stage: 'c',
          immediateEffect: (player) => { player.population = player.population + 6 },
          conditionalEffect: (player) => { }
        },
        {
          name: 'Farm',
          cost: 9,
          category: 'Industrial',
          icon: null,
          stage: 'c',
          immediateEffect: (player) => { player.reputation--},
          conditionalEffect: (player) => { }
        },
        {
          name: 'Landfill',
          cost: 4,
          category: 'Industrial',
          icon: null,
          stage: 'c',
          immediateEffect: (player) => { player.income = player.income + 2 },
          conditionalEffect: (player) => { }
        },
        {
          name: 'Mint',
          cost: 15,
          category: 'Industrial',
          icon: null,
          stage: 'c',
          immediateEffect: (player) => { player.income = player.income + 3},
          conditionalEffect: (player) => { }
        }
    ]
}