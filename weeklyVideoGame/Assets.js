class Assets{
    static square = [new Vector2(-1, -1), new Vector2(-1, 1), new Vector2(1, 1), new Vector2(1, -1)]

    static square2 = [new Vector2(-1, -1), new Vector2(-1, 1), new Vector2(0, 1), new Vector2(0, -1)]

    static slashingAttack = [
        new Vector2(-1, 0),
        new Vector2(-0.9, 0.4), new Vector2(-0.8, 0.6),new Vector2(-0.6, 0.8), new Vector2(-0.4, 0.9), new Vector2(-0.2, 0.97), 
        new Vector2(0, 1), 
        new Vector2(0.2, 0.97), new Vector2(0.4, 0.9), new Vector2(0.6, 0.8), new Vector2(0.8, 0.6), new Vector2(0.9, 0.4),
        new Vector2(1, 0),
        new Vector2(0.8, 0.25), new Vector2(0.6, 0.35), new Vector2(0.4, 0.45), new Vector2(0.2, 0.525),
        new Vector2(0, 0.55),
        new Vector2(-0.2, 0.525), new Vector2(-0.4, 0.45), new Vector2(- 0.6, 0.35), new Vector2(-0.8, 0.25)
    ]

    static triangle = [
        new Vector2(-1, -1), 
        new Vector2(1, -1), 
        new Vector2(0, 1), 
    ]

    static throwingProjectile = [
        new Vector2(-0.9,  0),
        new Vector2(-0.15,  0.2),
        new Vector2(-0.1,  0.18),
        new Vector2( 0.03,  0.3),
        new Vector2( 0.2,  0.35),
        new Vector2( 0.38,  0.3),
        new Vector2( 0.5,  0.18),
        new Vector2( 0.55,  0),
        new Vector2( 0.5, -0.18),
        new Vector2( 0.38, -0.3),
        new Vector2( 0.2, -0.35),
        new Vector2( 0.003, -0.3),
        new Vector2(-0.1, -0.18),
        new Vector2(-0.1500000, -0.2),
        new Vector2(-0.9000000,  0)
    ]

    static throwingTriangle = [
        new Vector2(1, 0), 
        new Vector2(-1, -1), 
        new Vector2(-1, 1), 
    ]
}