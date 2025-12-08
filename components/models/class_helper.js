export const ClassHelper = {
  class_include(target_class, source_class, options = {}) {
    options = {
      instance_methods: true,
      class_methods: false,
      ...options,
    }
    if (options.instance_methods) {
      if (source_class && source_class.prototype) {
        Object.defineProperties(target_class.prototype, Object.getOwnPropertyDescriptors(source_class.prototype))
        target_class.prototype.constructor = target_class // module 側の this.constructor が include 先の class になるようにする
      }
    }
    if (options.class_methods) {
      if (source_class) {
        // static メソッドをコピー（prototype は除外）
        const descriptors = Object.getOwnPropertyDescriptors(source_class)
        // ↓こういうのを全部除外しないといけないならそもそもこのやりかたは危険なのでは？
        delete descriptors.prototype // これを取らないとそもそも defineProperties がエラーになる
        delete descriptors.name      // これを取らないと mixin される側の name が変わる
        delete descriptors.length    // なんかわからんけどある
        delete descriptors.arguments // ？
        delete descriptors.caller    // ？
        Object.defineProperties(target_class, descriptors)
      }
    }
  },
}
