// 花火エフェクト
//
// 使い方
//
//   EffectInfo.fetch('fw_type_2').run({from_selector: ".gunship"})
//   EffectInfo.fetch('fw_type_2').run({from_el: mouse_event.target})
//
import MemoryRecord from "js-memory-record"
import { Random } from "./random.js"

class FireBall {
  static run(TheSp, params = {}) {
    const object = new this(TheSp, params)
    object.run()
  }

  constructor(TheSp, params) {
    this.TheSp = TheSp
    this.params = {...params}
  }

  run() {
    this.current = document.createElement("div")
    this.current.classList.add("fireball", this.params.css_class)
    this.current.style.transitionDuration = `${this.params.duration}ms`
    this.TheSp.body_el.appendChild(this.current)

    // 原点
    const rc = this.TheSp.from_rc
    const cx = rc.left + rc.width  / 2
    const cy = rc.top  + rc.height / 2

    // 移動元オブジェクトの大きさだけ左上にずらす
    const to_rc = this.current.getBoundingClientRect()
    const fx = cx - to_rc.width  / 2
    const fy = cy - to_rc.height / 2

    // 移動元指定
    this.current.style.position = "absolute"
    this.current.style.left = `${fx}px`
    this.current.style.top  = `${fy}px`

    // 移動先指定
    const a = 2 * Math.PI * this.params.angle
    const rx = Math.cos(a) * this.params.radius
    const ry = Math.sin(a) * this.params.radius
    this.current.style.transform = `translate(${rx}px, ${ry}px)`

    setTimeout(() => this.current_destroy(), this.params.duration + this.params.destroy_gap)
  }

  current_destroy() {
    this.TheSp.body_el.removeChild(this.current)
  }
}

class FireworksFactoryBase {
  static run(effect_info, params) {
    const object = new this(effect_info, params)
    object.run_around()
  }

  constructor(effect_info, params) {
    this.effect_info = effect_info
    this.params = params
  }

  run_around() {
    this.before_run()
    this.run()
  }

  // ループ前に共通してできることを行う
  before_run() {
    const from_el = this.params.from_el || document.querySelector(this.params.from_selector)
    this.from_rc = from_el.getBoundingClientRect()
    this.body_el = document.querySelector("body")
  }

  circle_create(params) {
    params = {
      ...this.params,
      ...params,
    }
    const angle_base = Random.rand()
    for (let index = 0; index < params.total; index++) {
      const options = {
        ...params,
      }
      if (options.radius_range) {
        options.radius = Random.range(...options.radius_range)
      }
      if (options.duration_range) {
        options.duration = Random.range(...options.duration_range)
      }
      if (options.destroy_gap_range) {
        options.destroy_gap = Random.range(...options.destroy_gap_range)
      }
      if (options.angle_rand) {
        options.angle = Random.rand()
      } else {
        options.angle = angle_base + 1.0 / params.total * index
      }
      this.fireball_create(options)
    }
  }

  fireball_create(params) {
    FireBall.run(this, params)
  }
}

class FireworksFactory1 extends FireworksFactoryBase {
  run() {
    this.effect_info.params_list.forEach(e => {
      this.circle_create(e)
    })
  }
}

export class EffectInfo extends MemoryRecord {
  static get define() {
    return [
      {
        key: "fw_type_1",
        factory: FireworksFactory1,
        params_list: [
          { total: 16, angle_rand: false, radius: null, radius_range: [32, 512], duration: null, duration_range: [300, 600], destroy_gap: null, destroy_gap_range: [-100, 100], css_class: "fireball_s1", },
          { total: 16, angle_rand: false, radius: 200,  radius_range: null,      duration: 300,  duration_range: null,       destroy_gap: 0,    destroy_gap_range: null,        css_class: "fireball_s1", },
        ],
      },
      {
        key: "fw_type_2",
        factory: FireworksFactory1,
        params_list: [
          { total: 16, angle_rand: false, radius: 200,  radius_range: null,      duration: 300,  duration_range: null,       destroy_gap: 0,    destroy_gap_range: null,        css_class: "fireball_s1", },
        ],
      },
      {
        key: "fw_type_3",
        factory: FireworksFactory1,
        params_list: [
          // { total: 8, angle_rand: false, radius: null, radius_range: [50, 400], duration: null, duration_range: [200, 1000], destroy_gap: null, destroy_gap_range: null, css_class: "fireball_s1", },
          { total: 12, angle_rand: false, radius: 128, radius_range: null, duration: 750, duration_range: null, destroy_gap: 0, destroy_gap_range: null, css_class: "fireball_s1", },
        ],
      },
    ]
  }

  run(params) {
    this.factory.run(this, params)
  }
}
