import Location from "shogi-player/src/location.js"

export class BattleMembership {
  constructor(battle_membership) {
    Object.assign(this, battle_membership)
  }

  get location() {
    return Location.fetch(this.location_key)
  }
}
