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
            conditionalEffects: [{stat: StatsConfig.STATS.MONEY, value: 2, condition: { type: TileConfig.CONDITION.ADJACENT, categories: TileConfig.CATEGORIES.ANY } } ]
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
          conditionalEffects: [ {stat: StatsConfig.STATS.REPUTATION, value: 1, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.INDUSTRIAL, TileConfig.CATEGORIES.COMMERCIAL, TileConfig.CATEGORIES.RESIDENTIAL] } } ]
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
          category: TileConfig.CATEGORIES.COMMERCIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
          conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.EVERY, icon: TileConfig.ICONS.OFFICE } } ]
        },
        {
          name: 'Fast Food Restaurant',
          cost: 7,
          category: TileConfig.CATEGORIES.COMMERCIAL,
          icon: TileConfig.ICONS.RESTAURANT,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
          conditionalEffects: [ {stat: StatsConfig.STATS.POPULATION, value: 3, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.RESIDENTIAL] } } ]
        },
        {
          name: 'Fancy Restaurant',
          cost: 9,
          category: TileConfig.CATEGORIES.COMMERCIAL,
          icon: TileConfig.ICONS.RESTAURANT,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 3},
          conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: -1, condition: { type: TileConfig.CONDITION.EVERY, icon: TileConfig.ICONS.RESTAURANT } } ]
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
          category: TileConfig.CATEGORIES.COMMERCIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
          conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.YOUR, categories: [TileConfig.CATEGORIES.MUNICIPAL, TileConfig.CATEGORIES.COMMERCIAL] } } ]
        },
        {
          name: 'Convenience Store',
          cost: 6,
          category: TileConfig.CATEGORIES.COMMERCIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
          conditionalEffects: []
        },
        {
          name: 'Freeway',
          cost: 5,
          category: TileConfig.CATEGORIES.COMMERCIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: null,
          conditionalEffects: [
            {stat: StatsConfig.STATS.REPUTATION, value: -1, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.RESIDENTIAL] } }
          ]
        },
        {
          name: 'Mobile Home Community',
          cost: 4,
          category: TileConfig.CATEGORIES.COMMERCIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.POPULATION, value: 6},
          conditionalEffects: []
        },
        {
          name: 'Farm',
          cost: 9,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.REPUTATION, value: -1},
          conditionalEffects: []
        },
        {
          name: 'Landfill',
          cost: 4,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {},
          conditionalEffects: []
        },
        {
          name: 'Mint',
          cost: 15,
          category: TileConfig.CATEGORIES.INDUSTRIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
          conditionalEffects: []
        },
        {
          name: 'Waterfront Realty',
          cost: 6,
          category: TileConfig.CATEGORIES.COMMERCIAL,
          icon: null,
          stage: TileConfig.STAGES.A,
          immediateEffect: null,
          conditionalEffects: [
            { stat: StatsConfig.STATS.MONEY, value: 2, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.LAKE] } }
          ]
        }
    ],

    b: [
      {
        name: 'Business Supply Store',
        cost: 8,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
        conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.EVERY, icon: TileConfig.ICONS.OFFICE } } ]
      },
      {
        name: 'Fast Food Restaurant',
        cost: 7,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: TileConfig.ICONS.RESTAURANT,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
        conditionalEffects: [ {stat: StatsConfig.STATS.POPULATION, value: 3, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.RESIDENTIAL] } } ]
      },
      {
        name: 'Fancy Restaurant',
        cost: 9,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: TileConfig.ICONS.RESTAURANT,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 3},
        conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: -1, condition: { type: TileConfig.CONDITION.EVERY, icon: TileConfig.ICONS.RESTAURANT } } ]
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
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
        conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.YOUR, categories: [TileConfig.CATEGORIES.MUNICIPAL, TileConfig.CATEGORIES.COMMERCIAL] } } ]
      },
      {
        name: 'Convenience Store',
        cost: 6,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
        conditionalEffects: []
      },
      {
        name: 'Freeway',
        cost: 5,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: null,
        conditionalEffects: [
          {stat: StatsConfig.STATS.REPUTATION, value: -1, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.RESIDENTIAL] } },
          {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.COMMERCIAL] } }
        ]
      },
      {
        name: 'Mobile Home Community',
        cost: 4,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.POPULATION, value: 6},
        conditionalEffects: []
      },
      {
        name: 'Farm',
        cost: 9,
        category: TileConfig.CATEGORIES.INDUSTRIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.REPUTATION, value: -1},
        conditionalEffects: []
      },
      {
        name: 'Landfill',
        cost: 4,
        category: TileConfig.CATEGORIES.INDUSTRIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {},
        conditionalEffects: []
      },
      {
        name: 'Mint',
        cost: 15,
        category: TileConfig.CATEGORIES.INDUSTRIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
        conditionalEffects: []
      },
      {
        name: 'Waterfront Realty',
        cost: 6,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: null,
        conditionalEffects: [
          { stat: StatsConfig.STATS.MONEY, value: 2, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.LAKE] } }
        ]
      }
    ],

    c: [
      {
        name: 'Business Supply Store',
        cost: 8,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
        conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.EVERY, icon: TileConfig.ICONS.OFFICE } } ]
      },
      {
        name: 'Fast Food Restaurant',
        cost: 7,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: TileConfig.ICONS.RESTAURANT,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
        conditionalEffects: [ {stat: StatsConfig.STATS.POPULATION, value: 3, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.RESIDENTIAL] } } ]
      },
      {
        name: 'Fancy Restaurant',
        cost: 9,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: TileConfig.ICONS.RESTAURANT,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 3},
        conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: -1, condition: { type: TileConfig.CONDITION.EVERY, icon: TileConfig.ICONS.RESTAURANT } } ]
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
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
        conditionalEffects: [ {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.YOUR, categories: [TileConfig.CATEGORIES.MUNICIPAL, TileConfig.CATEGORIES.COMMERCIAL] } } ]
      },
      {
        name: 'Convenience Store',
        cost: 6,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
        conditionalEffects: []
      },
      {
        name: 'Freeway',
        cost: 5,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: null,
        conditionalEffects: [
          {stat: StatsConfig.STATS.REPUTATION, value: -1, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.RESIDENTIAL] } },
          {stat: StatsConfig.STATS.INCOME, value: 1, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.COMMERCIAL] } }
        ]
      },
      {
        name: 'Mobile Home Community',
        cost: 4,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.POPULATION, value: 6},
        conditionalEffects: []
      },
      {
        name: 'Farm',
        cost: 9,
        category: TileConfig.CATEGORIES.INDUSTRIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.REPUTATION, value: -1},
        conditionalEffects: []
      },
      {
        name: 'Landfill',
        cost: 4,
        category: TileConfig.CATEGORIES.INDUSTRIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {},
        conditionalEffects: []
      },
      {
        name: 'Mint',
        cost: 15,
        category: TileConfig.CATEGORIES.INDUSTRIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: {stat: StatsConfig.STATS.INCOME, value: 1},
        conditionalEffects: []
      },
      {
        name: 'Waterfront Realty',
        cost: 6,
        category: TileConfig.CATEGORIES.COMMERCIAL,
        icon: null,
        stage: TileConfig.STAGES.A,
        immediateEffect: null,
        conditionalEffects: [
          { stat: StatsConfig.STATS.MONEY, value: 2, condition: { type: TileConfig.CONDITION.ADJACENT, categories: [TileConfig.CATEGORIES.LAKE] } }
        ]
      }
    ]
}
