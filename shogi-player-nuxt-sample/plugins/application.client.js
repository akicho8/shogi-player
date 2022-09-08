// Howler Howl をグローバルに定義する
// 一箇所だけでロードしてシングルトンにするのが超重要
// そうしないと Howler.unload() などが全体に効かない
import { Howl, Howler } from "howler"
