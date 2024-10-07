// AWS proxy setup
const corsProxyURL = "https://apcekwbz63.execute-api.us-east-2.amazonaws.com/iste340/proxy?url=";

const apiURL = "https://store.steampowered.com/api/appdetails";

const games = {
    // Type of Game (Genre)
    'Action': {
        "Just give me a recommendation": [
            { text: 'Apex Legends', value: 1172470 },
        ],
        // Game Mechanics or Focus
        'Shooters': {
            // Specific aspect of the game
            'Multiplayer': {
                'Paid': {
                    'Sandbox': [
                        { text: 'Garry\'s Mod', value: 4000 },
                    ],
                    'Shoot-em-up': {
                        'Competitive': {
                            'Super competitive': [
                                { text: 'Elden Ring', value: 1245620 },
                                { text: 'GTFO', value: 493520 },
                            ],
                            'Normal competitive': [
                                { text: 'Rainbow Six Siege', value: 359550 },
                            ]
                        },
                        'Casual' : [
                            { text: 'GTA 5', value: 271590 },
                            { text: 'Payday 3', value: 1272080 },
                        ]
                        
                    },
                    'Co-op': [
                        { text: 'Helldivers 2', value: 553850 },
                        { text: 'Deep Rock Galactic', value: 548430 },

                    ]
                }, 
                'Free to Play': [
                    { text: 'Apex Legends', value: 1172470 },
                    { text: 'Overwatch', value: 2357570 },
                    { text: 'Counter-Strike: Global Offensive', value: 730 },
                    { text: 'Team Fortress 2', value: 440 }
                ]
            },
            'Singleplayer': {
                "Linear": [
                    { text: 'DOOM Eternal', value: 782330 },
                    { text: 'Wolfenstein II: The New Colossus', value: 612880 },
                    { text: 'Halo', value: 976730 },
                    { text: 'Far Cry 6', value: 2369390 }
                ]
            }
        },
        'Platformer': {
            '2D': [
                { text: 'Celeste', value: 504230 },
                { text: 'Hollow Knight', value: 367520 },
                { text: 'Ori and the Will of the WIsps', value: 1057090 }
            ],
            '3D': [
                { text: 'Sonic Frontiers', value: 1237320 }
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
                { text: 'Harvest Moon: Light of Hope', value: 2140650 },
                { text: 'My Time at Portia', value: 666140 },
            ]
        },
        'Vehicle Simulation': {
            'Driving': [
                { text: 'Need for Speed Heat', value: 1222680 },
                { text: 'Dirt Rally 2.0', value: 690790 }
            ],
            'Flight': [
                { text: 'Microsoft Flight Simulator', value: 1250410 },
                { text: 'Ace Combat 7: Skies Unknown', value: 502500 },
                { text: 'Kerbal Space Program', value: 220200 }
            ]
        }
    }
};

/**
 * AJAX call to fetch game info from appID
 * @param {String} appId 
 * @returns 
 */
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