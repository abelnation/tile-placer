'use strict'

//
// Tile-Config
// Created by dpekar on 10/9/15.
//

const TileConfig = {}

TileConfig.BASIC = 'basic'
TileConfig.LAKE = 'lake'

TileConfig.STAGES = {
		A: 'a', 
		B: 'b', 
		C: 'c'
}



TileConfig.CATEGORIES = {
	RESIDENTIAL: 'Residential',
	MUNICIPAL: 'Municipal',
	COMMERCIAL: 'Commercial',
	INDUSTRIAL: 'Industrial',
	LAKE: 'lake'
}

TileConfig.CATEGORIES.ANY = [TileConfig.CATEGORIES.RESIDENTIAL, TileConfig.CATEGORIES.MUNICIPAL, TileConfig.CATEGORIES.COMMERCIAL, TileConfig.CATEGORIES.INDUSTRIAL]

TileConfig.ICONS = {
	SCHOOL: 'school',
	RESTAURANT: 'restaurant',
	OFFICE: 'office'	
}


TileConfig.CONDITION = {
	ADJACENT: 'adjacent',
	EVERY: 'every',
	AFTER: 'after',
	YOUR: 'your',
	OTHER: 'other'
}

TileConfig.CONDITION.NONADJACENT = [TileConfig.CONDITION.EVERY, TileConfig.CONDITION.AFTER, TileConfig.CONDITION.YOUR, TileConfig.CONDITION.OTHER]

module.exports = TileConfig