class Assets{
    static square = [new Vector2(-1, -1), new Vector2(-1, 1), new Vector2(1, 1), new Vector2(1, -1)]

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
}