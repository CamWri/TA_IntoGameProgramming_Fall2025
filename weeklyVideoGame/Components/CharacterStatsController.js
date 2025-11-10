class CharacterStatsController extends Component{
    playerArchetype

    maxHealth
    horzSpeed

    basicAttackCooldown
    basicAttackRange
    basicAttackDamage

    abilityOneCooldown
    abilityOneRange
    abilityOneDamage
    
    projectileSpeed 

    start(){
        if(this.playerArchetype == 0){
            //Tank
            this.maxHealth = 40
            this.horzSpeed = 50

            this.basicAttackCooldown = 1
            this.basicAttackRange = 3
            this.basicAttackDamage = 2

            this.abilityOneCooldown = 10
            this.abilityOneRange = 3
            this.abilityOneDamage = 3

            this.projectileSpeed = 100

        } else if(this.playerArchetype == 1){
            //Sniper
            this.maxHealth = 20
            this.horzSpeed = 150

            this.basicAttackCooldown = 2
            this.basicAttackRange = 7
            this.basicAttackDamage = 5

            this.abilityOneCooldown = 15
            this.abilityOneRange = 7
            this.abilityOneDamage = 2

            this.projectileSpeed = 200

        } else if (this.playerArchetype == 2){
            //Mid Range
            this.maxHealth = 30
            this.horzSpeed = 100

            this.basicAttackCooldown = 0.25
            this.basicAttackRange = 5
            this.basicAttackDamage = 4

            this.abilityOneCooldown = 5
            this.abilityOneRange = 5
            this.abilityOneDamage = 1

            this.projectileSpeed = 150
        }
    }
}