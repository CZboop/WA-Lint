// checking if entities all used, and all used ones are defined
class AllEntitiesUsed{
    constructor(skill){
        this.skill = skill;
        // TODO: add get all entities method to helper funcs?
        this.helper = new Helper(this.skill);
    }
    allEntitiesUsed() {
        
    }

    noUndefinedEntities() {

    }

}

module.exports = {
    AllEntitiesUsed
 }