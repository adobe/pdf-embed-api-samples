/* List of annotations */
const annotations = [
    /* Annotation data for highlight */
    {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "8a8ea969-d860-8dc3-5chb-29d9cbb1b84",
        "bodyValue": "Prime or plus plan for protection.",
        "motivation": "commenting",
        "target": {
            "source": "6d07d124-ac85-43b3-a867-36930f502ac6",
            "selector": {
                "node": {
                    "index": 0
                },
                "opacity": 0.4,
                "subtype": "highlight",
                "boundingBox": [
                    71.69551583223566, 
                    325.5741406817769, 
                    152.04393874767217, 
                    345.3522140148074
                ],
                "quadPoints": [
                    71.69551583223566, 
                    345.3522140148074, 
                    152.04393874767217, 
                    345.3522140148074, 
                    71.69551583223566, 
                    325.5741406817769, 
                    152.04393874767217, 
                    325.5741406817769
                ],
                "strokeColor": "#008b02",
                "strokeWidth": 3,
                "type": "AdobeAnnoSelector"
            }
        },
        "creator": {
            "type": "Person",
            "name": "John Smith"
        },
        "created": "2020-04-03T14:56:54Z",
        "modified": "2020-04-03T15:00:14Z"
    },
    /* Annotation data for note */
    {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "079d66a4-5ec2-4703-ae9d-30ccbb1aa84c",
        "bodyValue": "I added a note!",
        "motivation": "commenting",
        "target": {
            "source": "6d07d124-ac85-43b3-a867-36930f502ac6",
            "selector": {
                "node": {
                    "index": 1
                },
                "opacity": 0.4,
                "subtype": "note",
                "boundingBox": [
                    56.86196083246276,
                    63.51466901912244,
                    74.16777499886447,
                    80.82048318552415
                ],
                "strokeColor": "#5300eb",
                "strokeWidth": 3,
                "type": "AdobeAnnoSelector"
            }
        },
        "creator": {
            "type": "Person",
            "name": "John Smith"
        },
        "created": "2018-08-02T14:45:37Z",
        "modified": "2020-01-20T07:54:10Z"
    },
    /* Annotation data for reply to note */
    {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "eb46d1a9-e9c3-4e81-a6f4-ce5ba7a905e9",
        "bodyValue": "Reply to this.",
        "motivation": "replying",
        "target": {
            "source": "079d66a4-5ec2-4703-ae9d-30ccbb1aa84c"
        },
        "creator": {
            "type": "Person",
            "name": "Steve Baker"
        },
        "created": "2020-02-02T14:45:37Z",
        "modified": "2020-02-02T07:57:03Z"
    },
    /* Annotation data for note */
    {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "43a78ed5-e02e-8600-fbh5-18b97a8a881",
        "bodyValue": "Preserving the legacy with Bodea.",
        "motivation": "commenting",
        "target": {
            "source": "6d07d124-ac85-43b3-a867-36930f502ac6",
            "selector": {
                "node": {
                    "index": 0
                },
                "opacity": 0.4,
                "subtype": "note",
                "boundingBox": [
                    338.6995058281477,
                    326.8102702650913,
                    356.00531999454944,
                    344.116084431493
                ],
                "strokeColor": "#db3e00",
                "strokeWidth": 3,
                "type": "AdobeAnnoSelector"
            }
        },
        "creator": {
            "type": "Person",
            "name": "John Smith"
        },
        "created": "2020-04-01T20:35:17Z",
        "modified": "2020-04-01T20:35:17Z"
    },
    /* Annotation data for text annotation */
    {
        "@context": [
          "https://www.w3.org/ns/anno.jsonld",
          "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "02dcf931-d1cb-49c1-a8bc-d047892a06bc",
        "bodyValue": "I added a text annotation!",
        "motivation": "commenting",
        "stylesheet": {
          "type": "CssStylesheet",
          "value": "body-value-css { font: 14px Helvetica; color: #0000FF; }"
        },
        "target": {
          "source": "6d07d124-ac85-43b3-a867-36930f502ac6",
          "selector": {
            "node": {
              "index": 1
            },
            "subtype": "freetext",
            "boundingBox": [
              306.41829735235586,
              339.01199687491595,
              475.729044456285,
              357.0653042030006
            ],
            "styleClass": "body-value-css",
            "type": "AdobeAnnoSelector"
          }
        },
        "creator": {
          "type": "Person",
          "name": "John Smith"
        },
        "created": "2021-01-20T14:45:37Z",
        "modified": "2021-01-20T14:45:37Z"
    },      
    /* Annotation data for highlight */
    {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "17bf889a-f170-4c13-a655-4b1e5de0bf41",
        "bodyValue": "I highlighted this!",
        "motivation": "commenting",
        "target": {
            "source": "6d07d124-ac85-43b3-a867-36930f502ac6",
            "selector": {
                "node": {
                    "index": 3
                },
                "opacity": 0.1,
                "subtype": "highlight",
                "boundingBox": [
                    71.69551583223566,
                    325.5741406817769,
                    160.0787810392158,
                    345.3522140148074,
                ],
                "quadPoints": [
                    71.69551583223566,
                    345.3522140148074,
                    160.0787810392158,
                    345.3522140148074,
                    71.69551583223566,
                    325.5741406817769,
                    160.0787810392158,
                    325.5741406817769
                ],
                "strokeColor": "#5300eb",
                "strokeWidth": 3,
                "type": "AdobeAnnoSelector"
            }
        },
        "creator": {
            "type": "Person",
            "name": "John Smith"
        },
        "created": "2020-02-21T14:45:37Z",
        "modified": "2020-02-21T07:54:10Z"
    },
    /* Annotation data for highlight */
    {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "76829967-caa5-8eb6-32h6-180809818ac",
        "bodyValue": "",
        "motivation": "commenting",
        "target": {
            "source": "6d07d124-ac85-43b3-a867-36930f502ac6",
            "selector": {
                "node": {
                    "index": 1
                },
                "opacity": 0.4,
                "subtype": "highlight",
                "boundingBox": [
                    71.69551583223566,
                    269.33024464097133,
                    524.7370081169661,
                    293.4347715156023
                ],
                "quadPoints": [
                    71.69551583223566,
                    293.4347715156023,
                    524.7370081169661,
                    293.4347715156023,
                    71.69551583223566,
                    282.3096052657726,
                    524.7370081169661,
                    282.3096052657726,
                    71.69551583223566,
                    280.455410890801,
                    239.8091391629951,
                    280.455410890801,
                    71.69551583223566,
                    269.33024464097133,
                    239.8091391629951,
                    269.33024464097133
                ],
                "strokeColor": "#fccb00",
                "strokeWidth": 3,
                "type": "AdobeAnnoSelector"
            }
        },
        "creator": {
            "type": "Person",
            "name": "John Smith"
        },
        "created": "2020-04-01T20:37:03Z",
        "modified": "2020-04-01T20:37:03Z"
    },
    /* Annotation data for strikeout */
    {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "3adeae16-a868-4653-960e-613c048dddc5",
        "bodyValue": "I added a strikeout.",
        "motivation": "commenting",
        "target": {
            "source": "6d07d124-ac85-43b3-a867-36930f502ac6",
            "selector": {
                "node": {
                    "index": 2
                },
                "opacity": 0.4,
                "subtype": "strikeout",
                "boundingBox": [
                    72.31358062389286,
                    307.65026172371796,
                    251.552370204482,
                    316.921233598576
                ],
                "quadPoints": [
                    72.31358062389286,
                    316.921233598576,
                    251.552370204482,
                    316.921233598576,
                    72.31358062389286,
                    307.65026172371796,
                    251.552370204482,
                    307.65026172371796
                ],
                "strokeColor": "#b80000",
                "strokeWidth": 3,
                "type": "AdobeAnnoSelector"
            }
        },
        "creator": {
            "type": "Person",
            "name": "John Smith"
        },
        "created": "2020-02-21T14:45:37Z",
        "modified": "2020-02-21T07:54:10Z"
    },
    /* Annotation data for underline */
    {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "34c2bb70-60e2-4405-be33-a3c9865791e0",
        "bodyValue": "I underlined this text!",
        "motivation": "commenting",
        "target": {
            "source": "6d07d124-ac85-43b3-a867-36930f502ac6",
            "selector": {
                "node": {
                    "index": 4
                },
                "opacity": 0.1,
                "subtype": "underline",
                "boundingBox": [
                    72.31358062389286,
                    306.4141321404036,
                    256.4968885377396,
                    315.68510401526163,
                ],
                "quadPoints": [
                    72.31358062389286,
                    315.68510401526163,
                    256.4968885377396,
                    315.68510401526163,
                    72.31358062389286,
                    306.4141321404036,
                    256.4968885377396,
                    306.4141321404036
                ],
                "strokeColor": "#008b02",
                "strokeWidth": 3,
                "type": "AdobeAnnoSelector"
            }
        },
        "creator": {
            "type": "Person",
            "name": "John Smith"
        },
        "created": "2020-02-21T14:45:37Z",
        "modified": "2020-02-21T07:54:10Z"
    },
    /* Annotation data for underline */
    {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "8badb4b9-7f6b-8401-1eha-19ea189f886",
        "bodyValue": "40 years?",
        "motivation": "commenting",
        "target": {
            "source": "6d07d124-ac85-43b3-a867-36930f502ac6",
            "selector": {
                "node": {
                    "index": 2
                },
                "opacity": 0.1,
                "subtype": "underline",
                "boundingBox": [
                    315.8311085368312,
                    126.55727776815723,
                    354.76919041123506,
                    138.3005088096441
                ],
                "quadPoints": [
                    315.8311085368312,
                    138.3005088096441,
                    354.76919041123506,
                    138.3005088096441,
                    315.8311085368312,
                    126.55727776815723,
                    354.76919041123506,
                    126.55727776815723
                ],
                "strokeColor": "#008b02",
                "strokeWidth": 3,
                "type": "AdobeAnnoSelector"
            }
        },
        "creator": {
            "type": "Person",
            "name": "John Smith"
        },
        "created": "2020-04-01T20:39:26Z",
        "modified": "2020-04-01T20:39:26Z"
    },
    /* Annotation data for shape */
    {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld"
        ],
        "type": "Annotation",
        "id": "b3a12033-d57d-4405-9f54-51eb206e3b20",
        "bodyValue": "I added this drawing!",
        "motivation": "commenting",
        "target": {
            "source": "6d07d124-ac85-43b3-a867-36930f502ac6",
            "selector": {
                "node": {
                    "index": 3
                },
                "opacity": 0.5,
                "subtype": "shape",
                "boundingBox": [
                    309.65046062025914,
                    43.118530894434684,
                    389.3808187440385,
                    68.45918735238007
                ],
                "inkList": [[
                    313.9769141618596,
                    48.06304922769232,
                    314.5949789535168,
                    48.06304922769232,
                    314.5949789535168,
                    48.06304922769232,
                    314.5949789535168,
                    48.06304922769232,
                    314.5949789535168,
                    48.681114019349536,
                    314.5949789535168,
                    48.681114019349536,
                    314.5949789535168,
                    48.681114019349536,
                    315.213043745174,
                    49.299178811006755,
                    315.213043745174,
                    49.299178811006755,
                    315.213043745174,
                    49.917243602663916,
                    315.8311085368312,
                    51.15337318597835,
                    315.8311085368312,
                    51.15337318597835,
                    316.4491733284884,
                    51.77143797763557,
                    317.0672381201456,
                    53.00756756094995,
                    318.30336770346,
                    53.62563235260717,
                    318.92143249511724,
                    55.47982672757877,
                    319.5394972867744,
                    55.47982672757877,
                    321.39369166174606,
                    56.715956310893205,
                    322.62982124506044,
                    57.334021102550366,
                    323.24788603671766,
                    57.952085894207585,
                    325.10208041168926,
                    58.5701506858648,
                    326.3382099950037,
                    59.80628026917918,
                    326.3382099950037,
                    60.4243450608364,
                    328.8104691616325,
                    60.4243450608364,
                    330.0465987449469,
                    61.04240985249362,
                    332.5188579115757,
                    61.66047464415078,
                    333.7549874948901,
                    62.278539435808,
                    334.9911170782045,
                    62.278539435808,
                    336.8453114531761,
                    62.89660422746522,
                    337.46337624483334,
                    62.89660422746522,
                    338.6995058281477,
                    64.1327338107796,
                    339.31757061980494,
                    64.1327338107796,
                    340.5537002031194,
                    64.1327338107796,
                    341.78982978643376,
                    64.1327338107796,
                    343.0259593697482,
                    64.1327338107796,
                    343.64402416140535,
                    62.89660422746522,
                    344.2620889530626,
                    62.89660422746522,
                    345.498218536377,
                    62.278539435808,
                    346.7343481196914,
                    62.278539435808,
                    346.7343481196914,
                    62.278539435808,
                    346.7343481196914,
                    62.278539435808,
                    347.3524129113486,
                    61.66047464415078,
                    347.9704777030058,
                    61.66047464415078,
                    347.9704777030058,
                    61.04240985249362,
                    347.9704777030058,
                    61.04240985249362,
                    348.588542494663,
                    60.4243450608364,
                    350.44273686963464,
                    59.80628026917918,
                    351.0608016612918,
                    58.5701506858648,
                    351.0608016612918,
                    58.5701506858648,
                    351.678866452949,
                    57.952085894207585,
                    352.29693124460624,
                    57.334021102550366,
                    352.91499603626346,
                    56.715956310893205,
                    352.91499603626346,
                    56.715956310893205,
                    352.91499603626346,
                    56.097891519235986,
                    354.15112561957784,
                    56.097891519235986,
                    354.15112561957784,
                    56.097891519235986,
                    354.15112561957784,
                    56.097891519235986,
                    354.15112561957784,
                    56.097891519235986,
                    354.76919041123506,
                    55.47982672757877,
                    354.76919041123506,
                    55.47982672757877,
                    354.76919041123506,
                    55.47982672757877,
                    354.76919041123506,
                    54.24369714426439,
                    355.3872552028923,
                    54.24369714426439,
                    356.00531999454944,
                    54.24369714426439,
                    356.00531999454944,
                    53.62563235260717,
                    356.62338478620666,
                    53.62563235260717,
                    358.47757916117826,
                    53.00756756094995,
                    359.0956439528355,
                    52.38950276929273,
                    360.3317735361499,
                    52.38950276929273,
                    360.9498383278071,
                    51.77143797763557,
                    362.1859679111215,
                    51.77143797763557,
                    364.0401622860931,
                    51.15337318597835,
                    365.2762918694075,
                    51.15337318597835,
                    366.5124214527219,
                    51.15337318597835,
                    368.3666158276935,
                    51.15337318597835,
                    369.60274541100796,
                    51.15337318597835,
                    369.60274541100796,
                    51.15337318597835,
                    370.2208102026651,
                    51.15337318597835,
                    372.0750045776368,
                    51.15337318597835,
                    372.0750045776368,
                    51.15337318597835,
                    372.69306936929394,
                    51.15337318597835,
                    373.31113416095116,
                    51.15337318597835,
                    373.31113416095116,
                    51.15337318597835,
                    373.9291989526084,
                    51.15337318597835,
                    373.9291989526084,
                    51.15337318597835,
                    374.5472637442656,
                    51.15337318597835,
                    374.5472637442656,
                    51.15337318597835,
                    375.16532853592275,
                    51.15337318597835,
                    375.16532853592275,
                    51.15337318597835,
                    376.4014581192372,
                    51.15337318597835,
                    376.4014581192372,
                    51.15337318597835,
                    376.4014581192372,
                    51.15337318597835,
                    377.0195229108944,
                    51.15337318597835,
                    377.63758770255157,
                    51.77143797763557,
                    378.2556524942088,
                    51.77143797763557,
                    378.873717285866,
                    51.77143797763557,
                    380.1098468691804,
                    52.38950276929273,
                    383.2001708274664,
                    53.00756756094995,
                    384.43630041078086,
                    53.00756756094995,
                    384.43630041078086,
                    53.00756756094995,
                    385.67242999409524,
                    53.00756756094995,
                    385.67242999409524,
                    53.00756756094995,
                    385.67242999409524,
                    53.62563235260717
                ]],
                "strokeColor": "#1273de",
                "strokeWidth": 6,
                "type": "AdobeAnnoSelector"
            }
        },
        "creator": {
            "type": "Person",
            "name": "John Smith"
        },
        "created": "2020-01-21T14:45:37Z",
        "modified": "2020-01-21T07:54:10Z"
    }
];
