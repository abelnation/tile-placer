'use strict'

//
// Tile-list
// Created by dpekar on 10/7/15.
//
const TileConfig = require('./Tile-config')
const StatsConfig = require('./Stats-config')
// const Effect = require('../models/game/Effect')

module.exports = {

    lake: [{
            name: 'Lake',
            cost: 0,
            category: TileConfig.CATEGORIES.LAKE,
            icon: null,
            stage: TileConfig.LAKE,
            immediateEffect: {},
            conditionalEffects: [{stat: StatsConfig.STATS.MONEY, value: 2, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.INDUSTRIAL, TileConfig.CATEGORIES.COMMERICIAL, TileConfig.CATEGORIES.RESIDENTIAL, TileConfig.CATEGORIES.MUNICIPAL] } } ] 
    }],

    basic: [
        {
          name: 'Suburbs',
          cost: 3,
          category: TileConfig.CATEGORIES.RESIDENTIAL,
          icon: null,
          stage: TileConfig.BASIC,
          immediateEffect: {stat: StatsConfig.STATS.POPULATION, value: 2},
          conditionalEffects: []
        },
        {
          name: 'Community Park',
          cost: 4,
          category: TileConfig.CATEGORIES.MUNICIPAL,
          icon: null,
          stage: TileConfig.BASIC,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: -1},
          conditionalEffects: [ {stat: StatsConfig.STATS.REPUTATION, value: 1, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.INDUSTRIAL, TileConfig.CATEGORIES.COMMERICIAL, TileConfig.CATEGORIES.RESIDENTIAL] } } ]
         },
        {
          name: 'Heavy Factory',
          cost: 3,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.BASIC,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
          conditionalEffects: [ {stat: StatsConfig.STATS.REPUTATION, value: -1, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.MUNICIPAL, TileConfig.CATEGORIES.RESIDENTIAL] } } ]
        }
    ],

    a: [
        {
          name: 'Business Supply Store',
          cost: 8,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
          conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.EVERY, icon: TileConfig.ICONS.OFFICE } } ]
        },
        {
          name: 'Fast Food Restaurant',
          cost: 7,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: TileConfig.ICONS.RESTAURANT,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
          conditionalEffects: [ {stat: StatsConfig.STATS.POPULATION, value: 3, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.RESIDENTIAL] } } ]
        },
        {
          name: 'Mint',
          cost: 15,
          category: TileConfig.CATEGORIES.MUNICIPAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 3},
          conditionalEffects: [ {stat: StatsConfig.STATS.MONEY, value: 2, condition: { type: TileConfig.CONDITION.YOUR, categories: [TileConfig.CATEGORIES.MUNICIPAL] } } ]
        },
        {
          name: 'Parking Lot',
          cost: 12,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
          conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.YOUR, categories: [TileConfig.CATEGORIES.MUNICIPAL, TileConfig.CATEGORIES.COMMERICIAL] } } ]
        },
        {
          name: 'Convenience Store',
          cost: 6,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
          conditionalEffects: []
        },
        {
          name: 'Freeway',
          cost: 5,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: null,
          conditionalEffects: [ 
            {stat: StatsConfig.STATS.REPUTATION, value: -1, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.RESIDENTIAL] } },
            {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.COMMERICIAL] } } 
          ]
        },
        {
          name: 'Mobile Home Community',
          cost: 4,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: (player) => { player.population = player.population + 6 },
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Farm',
          cost: 9,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: (player) => { player.reputation--},
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Landfill',
          cost: 4,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: (player) => { player.income = player.income + 2 },
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Mint',
          cost: 15,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: (player) => { player.income = player.income + 3},
          conditionalEffects: (player, players) => { }
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
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Mobile Home Community',
          cost: 4,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.B,
          immediateEffect: (player) => { player.population = player.population + 6 },
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Farm',
          cost: 9,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.B,
          immediateEffect: (player) => { player.reputation--},
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Landfill',
          cost: 4,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.B,
          immediateEffect: (player) => { player.income = player.income + 2 },
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Mint',
          cost: 15,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.B,
          immediateEffect: (player) => { player.income = player.income + 3},
          conditionalEffects: (player, players) => { }
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
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Mobile Home Community',
          cost: 4,
          category: TileConfig.CATEGORIES.COMMERICIAL,
          icon: null,
          stage: TileConfig.STAGES.C,
          immediateEffect: (player) => { player.population = player.population + 6 },
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Farm',
          cost: 9,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.C,
          immediateEffect: (player) => { player.reputation--},
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Landfill',
          cost: 4,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.C,
          immediateEffect: (player) => { player.income = player.income + 2 },
          conditionalEffects: (player, players) => { }
        },
        {
          name: 'Mint',
          cost: 15,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.C,
          immediateEffect: (player) => { player.income = player.income + 3},
          conditionalEffects: (player, players) => { }
        }
    ]
}