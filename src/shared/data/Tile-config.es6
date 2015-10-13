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

TileConfig.ICONS = {
	SCHOOL: 'school',
	RESTAURANT: 'restaurant'	
}

TileConfig.CONDITION = {
	ADJACENT: 'adjacent',
	EVERY: 'every',
	AFTER: 'after',
	YOUR: 'your'	
}

module.exports = TileConfig