class Collisions {
  static inCollision(a, b) {
    //Get the points in the polygons on each game object
    const originalPointsA = a.getComponent(Polygon).points
    const originalPointsB = b.getComponent(Polygon).points

    //Apply the scale and positional transformational attributes to the points
    const worldPointsA = originalPointsA.map(p => Vector2.fromDOMPoint(a.transform.getWorldMatrix().transformPoint(p.toDOMPoint())))
    const worldPointsB = originalPointsB.map(p => Vector2.fromDOMPoint(b.transform.getWorldMatrix().transformPoint(p.toDOMPoint())))

    //Where each line formed by the polygons is stored
    const lines = []

    //For all point pairs in both arrays, find the orthogonal line and add it to lines
    for (const polygonPoints of [worldPointsA, worldPointsB]) {
      for (let i = 0; i < polygonPoints.length; i++) {
        const a = polygonPoints[i]
        const b = polygonPoints[(i+1)%polygonPoints.length]
        lines.push(a.minus(b).orthogonal().normalize())
      }
    }

    //For each line...
    const diffs = []
    for (const line of lines) {
      //...Find the dot product of all points in both polygons...
      const oneDots = worldPointsA.map(p => p.dot(line))
      const twoDots = worldPointsB.map(p => p.dot(line))

      //...and if there is a gap, they are not in collision
      const diffA = Math.max(...oneDots) - Math.min(...twoDots)
      const diffB = Math.max(...twoDots) - Math.min(...oneDots)
      if ( diffA < 0 || diffB < 0 ) return false
      const minDiff = Math.min(diffA, diffB)
      diffs.push(minDiff)
    }
    
    //If we get here, then the polygons were always overlapping, so we know they are in collision
    const minDiff = Math.min(...diffs)

    const minDiffIndex = diffs.indexOf(minDiff)

    const mtvLine = lines[minDiffIndex]

    return mtvLine.times(minDiff)
  }

  static inCollisionPointGameObject(a, b){
    //Get the points in the polygons on each game object
    const originalPointsB = b.getComponent(Polygon).points

    //Apply the scale and positional transformational attributes to the points
    const worldPointsB = originalPointsB.map(p => Vector2.fromDOMPoint(a.transform.getWorldMatrix().transformPoint(p.toDOMPoint())))

    //Where each line formed by the polygons is stored
    const lines = []

    //For all point pairs in both arrays, find the orthogonal line and add it to lines
    for (const polygonPoints of [worldPointsB]) {
      for (let i = 0; i < polygonPoints.length; i++) {
        const a = polygonPoints[i]
        const b = polygonPoints[(i+1)%polygonPoints.length]
        lines.push(a.minus(b).orthogonal().normalize())
      }
    }

    //For each line...
    const diffs = []
    for (const line of lines) {
      //...Find the dot product of all points in both polygons...
      const oneDots = [a].map(p => p.dot(line))
      const twoDots = worldPointsB.map(p => p.dot(line))

      //...and if there is a gap, they are not in collision
      const diffA = Math.max(...oneDots) - Math.min(...twoDots)
      const diffB = Math.max(...twoDots) - Math.min(...oneDots)
      if ( diffA < 0 || diffB < 0 ) return false
    }

    //If we get here, then the polygons were always overlapping, so we know they are in collision
    return true
  }

  static raycast(point){
    for(const gameObject of SceneManager.getActiveScene().gameObjects.filter(go => go.layer == "UI" && go.getComponent(Collider))){
      if(Collisions.inCollisionPointGameObject(point, gameObject)){
        return gameObject
      }
    }
  }
}