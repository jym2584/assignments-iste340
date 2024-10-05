// AWS proxy setup
const corsProxyURL = "https://apcekwbz63.execute-api.us-east-2.amazonaws.com/iste340/proxy?url=";

const apiURL = "https://store.steampowered.com/api/appdetails";

const games = {
    // Type of Game (Genre)
    'Action': {
        "Just give me anything": [
            { text: 'Apex Legends', value: 1172470 },
        ],
        // Game Mechanics or Focus
        'First-Person Shooter (FPS)': {
            // Specific aspect of the game
            'Multiplayer': [
                { text: 'Call of Duty: Modern Warfare', value: 1302010 },
                { text: 'Apex Legends', value: 1172470 },
                { text: 'Overwatch', value: 311310 },
                { text: 'Counter-Strike: Global Offensive', value: 730 }
            ],
            'Single-Player Campaign': {
                "Linear": [
                    { text: 'DOOM Eternal', value: 782330 },
                    { text: 'Wolfenstein II: The New Colossus', value: 384650 },
                    { text: 'Halo Infinite', value: 1240400 },
                    { text: 'Far Cry 6', value: 1348550 }
                ],
                "Story driven choices": [
                    { text: 'DOOM Eternal', value: 782330 },
                    { text: 'Wolfenstein II: The New Colossus', value: 384650 },
                    { text: 'Halo Infinite', value: 1240400 },
                    { text: 'Far Cry 6', value: 1348550 }
                ]
            }
        },
        'Platformer': {
            '2D': [
                { text: 'Celeste', value: 504230 },
                { text: 'Hollow Knight', value: 367520 },
                { text: 'Ori and the Blind Forest', value: 219790 }
            ],
            '3D': [
                { text: 'Sonic Frontiers', value: 623230 }
            ]
        }
    },

    'Role-Playing Game (RPG)': {
        'Action RPG': {
            'Open-World': [
                { text: 'The Witcher 3: Wild Hunt', value: 292030 },
                { text: 'Elden Ring', value: 1245620 },
                { text: 'Horizon Zero Dawn', value: 1151640 },
                { text: 'Cyberpunk 2077', value: 1091500 }
            ],
            'Linear': [
                { text: 'Dark Souls 3', value: 374320 },
                { text: 'Nioh 2', value: 1512820 },
                { text: 'Sekiro: Shadows Die Twice', value: 814380 },
                { text: 'Devil May Cry 5', value: 601150 }
            ]
        },
        'Turn-Based': {
            'Strategy': [
                { text: 'XCOM 2', value: 268500 },
                { text: 'Divinity: Original Sin 2', value: 435150 },
            ],
            'Classic JRPG': [
                { text: 'Dragon Quest XI', value: 806190 },
                { text: 'Chrono Trigger', value: 613830 }
            ]
        }
    },

    'Simulation': {
        'Life Simulation': {
            'Building/Management': [
                { text: 'The Sims 4', value: 1222670 },
                { text: 'Cities: Skylines', value: 255710 },
                { text: 'Planet Zoo', value: 703080 }
            ],
            'Farming': [
                { text: 'Stardew Valley', value: 413150 },
                { text: 'Harvest Moon: Light of Hope', value: 495320 },
                { text: 'My Time at Portia', value: 666140 },
            ]
        },
        'Vehicle Simulation': {
            'Driving': [
                { text: 'Need for Speed Heat', value: 1222680 },
                { text: 'Dirt Rally 2.0', value: 690320 }
            ],
            'Flight': [
                { text: 'Microsoft Flight Simulator', value: 1250410 },
                { text: 'Ace Combat 7: Skies Unknown', value: 742290 },
                { text: 'DCS World', value: 220200 }
            ]
        }
    }
};

async function fetchGameInfoFromStore(appId) {
    try {
        // fetch courses from tiger center
        let query = await fetch(`${corsProxyURL}${apiURL}?appids=${appId}`,
            {
                method: "GET"
            }
        ); 
        if (!query.ok) { return null; }
        
        // parse response
        let response = await query.json();
        if (!response[`${appId}`]['success']) { return null; }

        let gameInfo = response[`${appId}`]['data'];
        
        let returnData = {
            name: gameInfo.name,
            value: appId,
            description: gameInfo.short_description,
            website: gameInfo.website,
            media: {
                banner: gameInfo.header_image,
                screenshots: gameInfo.screenshots,
                movies: gameInfo.movies
            }

        }
        return returnData;

    } catch (e) {
        console.log(e);
    }
}