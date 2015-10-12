'use strict'

//
// Tile-list
// Created by dpekar on 10/7/15.
//
const TileConfig = require('./Tile-config')

module.exports = {

    lake: [{
            name: 'Lake',
            cost: 0,
            category: TileConfig.CATEGORIES.LAKE,
            icon: null,
            stage: TileConfig.LAKE,
            immediateEffect: (player) => { },
            conditionalEffect: (player, players) => { }      
    }],

    basic: [
        {
          name: 'Suburbs',
          cost: 3,
          category: TileConfig.CATEGORIES.RESIDENTIAL,
          icon: null,
          stage: TileConfig.BASIC,
          immediateEffect: (player) => { player.population = player.population + 2},
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Community Park',
          cost: 4,
          category: TileConfig.CATEGORIES.MUNICIPAL,
          icon: null,
          stage: TileConfig.BASIC,
          immediateEffect: (player) => { player.income-- },
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Heavy Factory',
          cost: 3,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.BASIC,
          immediateEffect: (player) => { player.income++ },
          conditionalEffect: (player, players) => { }
        }
    ],

    a: [
        {
          name: 'Convenience Store',
          cost: 6,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: (player) => { player.income++ },
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Mobile Home Community',
          cost: 4,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: (player) => { player.population = player.population + 6 },
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Farm',
          cost: 9,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: (player) => { player.reputation--},
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Landfill',
          cost: 4,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: (player) => { player.income = player.income + 2 },
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Mint',
          cost: 15,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: (player) => { player.income = player.income + 3},
          conditionalEffect: (player, players) => { }
        } 
    ],

    b: [
        {
          name: 'Convenience Store',
          cost: 6,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.B,
          immediateEffect: (player) => { player.income++ },
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Mobile Home Community',
          cost: 4,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.B,
          immediateEffect: (player) => { player.population = player.population + 6 },
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Farm',
          cost: 9,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.B,
          immediateEffect: (player) => { player.reputation--},
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Landfill',
          cost: 4,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.B,
          immediateEffect: (player) => { player.income = player.income + 2 },
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Mint',
          cost: 15,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.B,
          immediateEffect: (player) => { player.income = player.income + 3},
          conditionalEffect: (player, players) => { }
        }
    ],

    c: [
        {
          name: 'Convenience Store',
          cost: 6,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.C,
          immediateEffect: (player) => { player.income++ },
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Mobile Home Community',
          cost: 4,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.C,
          immediateEffect: (player) => { player.population = player.population + 6 },
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Farm',
          cost: 9,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.C,
          immediateEffect: (player) => { player.reputation--},
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Landfill',
          cost: 4,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.C,
          immediateEffect: (player) => { player.income = player.income + 2 },
          conditionalEffect: (player, players) => { }
        },
        {
          name: 'Mint',
          cost: 15,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.C,
          immediateEffect: (player) => { player.income = player.income + 3},
          conditionalEffect: (player, players) => { }
        }
    ]
}